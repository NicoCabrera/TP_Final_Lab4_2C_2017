import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
import { CustomOption } from '../quiz/quiz.component';

declare var $;
declare var Materialize;
@Component({
  selector: 'app-admin-users-delete',
  templateUrl: './admin-users-delete.component.html',
  styleUrls: ['./admin-users-delete.component.css']
})
export class AdminUsersDeleteComponent implements OnInit {
  results: Array<any>;
  username: string;
  email: string;
  selOpt1: CustomOption;
  selOpt2: CustomOption;
  opt1: Array<CustomOption> = [{ name: "Sin Especificar", value: -1 }, { name: "Empleado", value: 221548621 }, { name: "Cliente", value: 535751 }, { name: "Encargado", value: 96312471 }, { name: "Administrador", value: 88107751 }];
  opt2: Array<CustomOption> = [{ name: "Ninguna", value: -1 }, { name: "CABA", value: 151531 }, { name: "Zona Sur", value: 265840 }, { name: "Zona Norte", value: 650540 }];
  selectedUser: any;
  showSpinner: boolean;
  headerMsj: string;
  constructor(private webService: WebService) {
    this.username = "";
    this.email = "";
    this.selOpt1 = new CustomOption();
    this.selOpt1.name = "Sin Especificar";
    this.selOpt1.value = -1;
    this.selOpt2 = new CustomOption();
    this.selOpt2.name = "Ninguna";
    this.selOpt2.value = -1;
    this.results = new Array<any>();
    this.selectedUser = { username: "", email: "", locationid: -1, rolid: -1 };
    this.showSpinner = false;
    this.headerMsj = "";
  }

  ngOnInit() {
    this.getDataForAutocomplete();
    this.initSelect();
  }


  initModals() {
    $(document).ready(function () {
      $('.modal').modal();
    });
  }


  getDataForAutocomplete() {
    this.webService.post({ jwt: localStorage.getItem("token") }, "http://localhost/apiFinal/apirest/user/usernames").then(
      (data) => {
        let usernames = [];
        data['usernames'].forEach(username => {
          usernames[username] = null;
        });

        let emails = [];
        data['emails'].forEach(email => {
          emails[email] = null;
        });

        this.initAutocompletes(usernames, emails);
      });
  }

  initAutocompletes(usernames, emails) {
    $('#autocomplete-input-1').autocomplete({
      data: usernames,
      limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete: function (val) {
        // Callback function when value is autcompleted.
      },
      minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });

    $('#autocomplete-input-2').autocomplete({
      data: emails,
      limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete: function (val) {
        // Callback function when value is autcompleted.
      },
      minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });

  }

  initSelect() {
    $(document).ready(function () {
      $('select').material_select();
    });
  }

  setUserToDelete(user) {
    this.selectedUser = user;
    $('#confirmDeleteAdminModal').modal('open');
  }

  searchOnClick() {
    this.showSpinner = true;
    $('.btn').addClass('disabled');
    let filters = {
      username: $('#autocomplete-input-1').val().toString(),
      email: $('#autocomplete-input-2').val().toString(),
      rolid: parseInt($('#selOpt1')[0].value),
      locationid: parseInt($('#selOpt2')[0].value)
    }
    if (this.validateFilters(filters)) {
      this.webService.post({ jwt: localStorage.getItem("token"), filters: filters }, "http://localhost/apiFinal/apirest/user/filteredusers").then(
        (data) => {
          this.results = data.users;
          this.showSpinner = false;
          $('.btn').removeClass('disabled');
        });
    } else {
      this.showSpinner = false;
      $('.btn').removeClass('disabled');
    }

  }

  validateFilters(filters) {
    let rv: boolean = true;
    if (filters.username == "" && filters.email == "" && filters.rolid == -1 && filters.locationid == -1) {
      Materialize.toast("Debe ingresar algún criterio de búsqueda", 4000);
      rv = false;
    }
    return rv;
  }

  closeModal() {
    $('#confirmDeleteAdminModal').modal('close');
  }

  deleteSelectedUser() {
    this.showSpinner = true;
    $('.btn').addClass('disabled');

    this.webService.post({ jwt: localStorage.getItem("token"), userid: this.selectedUser.userid }, "http://localhost/apiFinal/apirest/user/delete").then(
      (data) => {
        this.headerMsj = data.message;
        this.showSpinner = false;
        this.results = [];
        $('.btn').removeClass('disabled');
        $('#delete-user-admin-modal').modal('open');
      });
  }
}


