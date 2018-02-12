import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Customer } from '../../classes/customer';
import { CustomOption } from '../quiz/quiz.component';
import { Employee } from '../../classes/employee';
declare var Materialize;
declare var $;
@Component({
  selector: 'app-admin-users-register',
  templateUrl: './admin-users-register.component.html',
  styleUrls: ['./admin-users-register.component.css']
})
export class AdminUsersRegisterComponent implements OnInit {

  form: FormGroup;
  user: Employee;
  showSpinner: boolean;
  errorMessages: Array<string>;
  headerMsj: string;
  isValid: boolean;
  selectedOption1: CustomOption;
  selectedOption2: CustomOption;
  opt1: Array<CustomOption> = [{ name: "Empleado", value: 221548621 }, { name: "Cliente", value: 535751 }, { name: "Encargado", value: 96312471 }, { name: "Administrador", value: 88107751 }];
  opt2: Array<CustomOption> = [{ name: "CABA", value: 151531 }, { name: "Zona Sur", value: 265840 }, { name: "Zona Norte", value: 650540 }];
  withOutLocation: boolean;

  constructor(private fb: FormBuilder, private router: Router, private webService: WebService) {
    this.user = new Employee();
    this.showSpinner = false;
    this.errorMessages = new Array<string>();
    this.headerMsj = "";
    this.isValid = false;
    this.selectedOption1 = new CustomOption();
    this.selectedOption1.name = "Empleado";
    this.selectedOption1.value = 221548621;
    this.selectedOption2 = new CustomOption();
    this.selectedOption2.name = "CABA";
    this.selectedOption2.value = 151531;
    this.withOutLocation = false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl(this.user.username, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.maxLength(50), Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.maxLength(50)]),
    });
    this.initCharacterCount();
    this.initModal();
    this.initSelect();
  }


  initCharacterCount() {
    $(document).ready(function () {
      $('input').characterCounter();
    });
  }

  initModal() {
    $(document).ready(function () {
      $('.modal').modal();
    });
  }

  initSelect() {
    var context = this;
    var handler = this.selectOnChange;
    $(document).ready(function () {
      $('select').material_select();
      $("#selectForQuestion1").change({ context: context }, handler);
    });
  }


  initTab(){
    
  }


  selectOnChange(event) {
    let context = event.data.context;
    let selectedOption: string = $("#selectForQuestion1 option:selected").text().toString().trim();
    if (selectedOption == "Cliente" || selectedOption == "Administrador") {
      $(".selectContainer").fadeOut("slow", () => { });
      context.withOutLocation = true;
    } else {
      $(".selectContainer").fadeIn("slow", () => { });
      context.withOutLocation = false;
    }
  }

  save() {
    this.clearModalMessages();
    this.user.locationid = parseInt($('#selectForQuestion2')[0].value);
    this.user.rolid = parseInt($('#selectForQuestion1')[0].value);
    this.showSpinner = true;
    $('.btn').addClass('disabled');
    this.webService.post(this.user, "http://localhost/apiFinal/apirest/user/adminadd")
      .then((data) => {
        if (data.invalid.length > 0) {
          this.headerMsj = data.message;
          this.errorMessages = data.invalid;
          this.showErrorMessages();
        } else {
          this.headerMsj = data.message;
          this.showSuccessMessages();
        }
        this.showSpinner = false;
        $('.btn').removeClass('disabled');
      });
  }

  clearModalMessages() {
    this.headerMsj = "";
    this.errorMessages = [];
  }

  showErrorMessages() {
    $('.modal-content').removeClass('green');
    $('.modal-content').addClass('red');
    $('#modal-admin-register').modal('open');
  }

  showSuccessMessages() {
    $('.modal-content').removeClass('red');
    $('.modal-content').addClass('green');
    $('#modal-admin-register').modal('open');
  }

  

}
