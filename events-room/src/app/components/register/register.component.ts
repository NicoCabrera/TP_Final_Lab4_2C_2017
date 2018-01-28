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
import { gs } from '../../../environments/environment';

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
  headerMsj: string;
  isValid:boolean;
  constructor(private fb: FormBuilder, private router: Router, private webService: WebService) {
    this.user = new Customer();
    this.showSpinner = false;
    this.errorMessages = new Array<string>();
    this.headerMsj = "";
    this.isValid = true;
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl(this.user.username, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.maxLength(50), Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.maxLength(50)]),
    });
    this.getIpAddress();
    this.initCharacterCount();
    this.initModal();
  }


  getIpAddress() {

    /*
    $.getJSON('//freegeoip.net/json/?callback=?', (data) => {
      this.ipAddess = data.ip;
    });
    */
  }
  submitOnClick() {
    this.clearModalMessages();
    this.showSpinner = true;
    $('.btn').addClass('disabled');
    this.webService.post(this.user, "http://localhost/apiFinal/apirest/login/signup")
      .then((data) => {
        if (data.invalid.length > 0 || (data.jwt == undefined)) {
          this.headerMsj = data.message;
          this.errorMessages = data.invalid;
          this.showErrorMessages();
        } else {
          this.headerMsj = data.message;
          localStorage.setItem('token', data.jwt);
          this.router.navigateByUrl("/registered-user");
        }
        this.showSpinner = false;
        $('.btn').removeClass('disabled');
      });

  }

  showErrorMessages() {
    $('.modal-content').removeClass('green');
    $('.modal-content').addClass('red');
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

  clearModalMessages() {
    this.headerMsj = "";
    this.errorMessages = [];
  }

  resolved(captchaResponse: string) {
    this.webService.postCaptcha(captchaResponse, gs, "https://www.google.com/recaptcha/api/siteverify")
      .then(rv => {
        this.isValid = rv.success;
      });
  }
}
