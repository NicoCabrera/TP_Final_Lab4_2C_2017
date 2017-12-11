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
      firstname: new FormControl(this.user.firstname, [Validators.required, Validators.maxLength(50)]),
      lastname: new FormControl(this.user.lastname, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.maxLength(50), Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.maxLength(50)]),
      username: new FormControl(this.user.username, [Validators.required, Validators.maxLength(50)]),
      street: new FormControl(this.user.address.street, [Validators.maxLength(50)]),
      number: new FormControl(this.user.address.number, [Validators.maxLength(10)]),
      city: new FormControl(this.user.address.city, [Validators.maxLength(50)])
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
        } else if (data.status == 0) {
          this.headerMsj = data.message;
          $('.modal').modal('open');
        } else {
          this.headerMsj = data.message;
          this.errorMessages = data.invalid;
          $('.modal').modal('open');
        }
        this.showSpinner = false;
        $('.btn').removeClass('disabled');
      });
  }

  setTestValue() {
    this.form.get("firstname").setValue("Primer nombre");
    this.form.get("lastname").setValue("Apellido");
    this.form.get("email").setValue("correo@correo.com.ar");
    this.form.get("password").setValue("contraseñasuperloca123456");
    this.form.get("username").setValue("Pedro El Escamoso");
    this.form.get("street").setValue("Mi Calle");
    this.form.get("number").setValue(123545);
    this.form.get("city").setValue("Buenos Aires");
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
