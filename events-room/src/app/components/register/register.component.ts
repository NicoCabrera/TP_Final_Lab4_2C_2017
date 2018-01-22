import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../../classes/customer';
import { WebService } from '../../services/web.service';
import { Response } from '@angular/http';
import { error } from 'util';
import { User } from '../../classes/user';
import { useAnimation } from '@angular/core/src/animation/dsl';
import { DataResponse } from '../../classes/dataResponse';
declare var $;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  user: Customer;
  showSpinner: boolean;
  errorMessages: Array<string>;
  headerMsj:string;
  constructor(private fb: FormBuilder, private router: Router, private webService: WebService) {
    this.user = new Customer();
    this.showSpinner = false;
    this.errorMessages = new Array<string>();
    this.headerMsj = "";
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl(this.user.username, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.maxLength(50), Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.maxLength(50)]),
    });

    this.initCharacterCount();
    this.initModal();
  }

  submitOnClick() {
    this.clearModalMessages();
    this.showSpinner = true;
    $('.btn').addClass('disabled');
    this.webService.post(this.user, "http://localhost/apiFinal/apirest/login/signup")
      .then((data) => {
        if (data.status == 200) {
          this.headerMsj = data.message;
          this.showSuccessMessage();
        } else if (data.status == 0) {
          this.headerMsj = data.message;
          this.showErrorMessages();
        } else {
          this.headerMsj = data.message;
          this.errorMessages = data.invalid;
          this.showErrorMessages();
        }
        this.showSpinner = false;
        $('.btn').removeClass('disabled');
      });

  }

  showErrorMessages(){
    $('.modal-content').removeClass('green');
    $('.modal-content').addClass('red');
    $('.modal').modal('open');
  }

  showSuccessMessage(){
    $('.modal-content').removeClass('red');
    $('.modal-content').addClass('green');
    $('.modal').modal('open');
  }

  setTestValue() {
    this.form.get("username").setValue("Usuario Pruebas");
    this.form.get("email").setValue("correo@correo.com.ar");
    this.form.get("password").setValue("contraseñasuperloca123456");
    $("label").addClass("active");
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

  clearModalMessages(){
    this.headerMsj = "";
    this.errorMessages = [];
  }

}
