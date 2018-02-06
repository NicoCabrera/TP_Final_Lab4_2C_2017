import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Customer } from '../../classes/customer';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';
declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: Customer;
  showSpinner: boolean;
  errorMessages: Array<string>;
  headerMsj: string;
  constructor(private fb: FormBuilder, private router: Router, private webService: WebService) {
    this.user = new Customer();
    this.showSpinner = false;
    this.errorMessages = new Array<string>();
    this.headerMsj = "";
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl(this.user.email, [Validators.required, Validators.maxLength(50), Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.maxLength(50)]),
    });
    this.initCharacterCount();
    this.initModal();
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

  setTestValue() {
    this.form.get("email").setValue("correo@correo.com.ar");
    this.form.get("password").setValue("contraseñasuperloca123456");
    $("label").addClass("active");
  }

  setTestValueForAttendant() {
    this.form.get("email").setValue("encargado@encargado.com");
    this.form.get("password").setValue("contraseñasuperloca123456");
    $("label").addClass("active");
  }

  submitOnClick() {
    this.clearModalMessages();
    this.showSpinner = true;
    $('.btn').addClass('disabled');
    this.webService.post(this.user, "http://localhost/apiFinal/apirest/login/signin")
      .then((data) => {
        if (data.invalid.length > 0 || (data.jwt == undefined)) {
          this.headerMsj = data.message;
          this.errorMessages = data.invalid;
          this.showErrorMessages();
        } else {
          this.headerMsj = data.message;
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('username', data.username);
          localStorage.setItem('email', data.email);
          localStorage.setItem('permissions', JSON.stringify(data.permissions));
          switch (data.rolid) {
            case 535751:
              this.router.navigateByUrl("/registered-user/eventRoomViewer");
              break;
            case 96312471:
              console.log(data.locationid[0]);
              localStorage.setItem('locationid',data.locationid[0]);
              this.router.navigateByUrl("/registered-user/attendant");
              break;
            default:
              break;
          }

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

}
