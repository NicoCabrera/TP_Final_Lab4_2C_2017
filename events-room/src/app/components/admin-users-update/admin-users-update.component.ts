import { Component, OnInit } from '@angular/core';
import { CustomOption } from '../quiz/quiz.component';
import { WebService } from '../../services/web.service';
import { Router } from '@angular/router';

declare var $;
declare var Materialize;
@Component({
  selector: 'app-admin-users-update',
  templateUrl: './admin-users-update.component.html',
  styleUrls: ['./admin-users-update.component.css']
})
export class AdminUsersUpdateComponent implements OnInit {

  results: Array<any>;
  username: string;
  email: string;
  sOpt1: CustomOption;
  sOpt2: CustomOption;
  opt1: Array<CustomOption> = [{ name: "Sin Especificar", value: -1 }, { name: "Empleado", value: 221548621 }, { name: "Cliente", value: 535751 }, { name: "Encargado", value: 96312471 }, { name: "Administrador", value: 88107751 }];
  opt2: Array<CustomOption> = [{ name: "Ninguna", value: -1 }, { name: "CABA", value: 151531 }, { name: "Zona Sur", value: 265840 }, { name: "Zona Norte", value: 650540 }];
  selectedUser: any;
  showSpinner: boolean;
  headerMsj: string;
  constructor(private webService: WebService,private router: Router) {
    this.username = "";
    this.email = "";
    this.sOpt1 = new CustomOption();
    this.sOpt1.name = "Sin Especificar";
    this.sOpt1.value = -1;
    this.sOpt2 = new CustomOption();
    this.sOpt2.name = "Ninguna";
    this.sOpt2.value = -1;
    this.results = new Array<any>();
    this.selectedUser = { username: "", email: "", locationid: -1, rolid: -1 };
    this.showSpinner = false;
    this.headerMsj = "";
  }

  ngOnInit() {
    this.getDataForAutocomplete();
    this.initSelect();
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
    $('#autocomplete-input-01').autocomplete({
      data: usernames,
      limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete: function (val) {
        // Callback function when value is autcompleted.
      },
      minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });

    $('#autocomplete-input-02').autocomplete({
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


  searchOnClick() {
    this.showSpinner = true;
    $('.btn').addClass('disabled');
    let filters = {
      username: $('#autocomplete-input-01').val().toString(),
      email: $('#autocomplete-input-02').val().toString(),
      rolid: parseInt($('#sOpt1')[0].value),
      locationid: parseInt($('#sOpt2')[0].value)
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


  showUserDetailToUpdate(user) {
    this.router.navigate(['/registered-user/update-user', user]);
  }
}
