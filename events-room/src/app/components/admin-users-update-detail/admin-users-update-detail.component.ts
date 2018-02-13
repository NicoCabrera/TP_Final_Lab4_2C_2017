import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebService } from '../../services/web.service';
import { Employee } from '../../classes/employee';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomOption } from '../quiz/quiz.component';
declare var Materialize;
declare var $;

@Component({
  selector: 'app-admin-users-update-detail',
  templateUrl: './admin-users-update-detail.component.html',
  styleUrls: ['./admin-users-update-detail.component.css']
})
export class AdminUsersUpdateDetailComponent implements OnInit {
  user:Employee
  form: FormGroup;
  showSpinner: boolean;
  errorMessages: Array<string>;
  headerMsj: string;
  isValid: boolean;
  userRol: CustomOption;
  userLocation: CustomOption;
  opt1: Array<CustomOption> = [{ name: "Empleado", value: 221548621 }, { name: "Cliente", value: 535751 }, { name: "Encargado", value: 96312471 }, { name: "Administrador", value: 88107751 }];
  opt2: Array<CustomOption> = [{ name: "CABA", value: 151531 }, { name: "Zona Sur", value: 265840 }, { name: "Zona Norte", value: 650540 }];
  withOutLocation: boolean;
  userid:number;

  constructor(private fb: FormBuilder, private router: Router, private webService: WebService  ,private route: ActivatedRoute,) {
    this.user = new Employee();
    this.showSpinner = false;
    this.errorMessages = new Array<string>();
    this.headerMsj = "";
    this.isValid = false;
    this.userRol = new CustomOption();
    this.userRol.name = "Empleado";
    this.userRol.value = 221548621;
    this.userLocation = new CustomOption();
    this.userLocation.name = "CABA";
    this.userLocation.value = 151531;
    this.withOutLocation = false;
    this.userid = -1;
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl(this.user.username, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.maxLength(50), Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.maxLength(50)]),
    });

    this.route.params.subscribe((user) => {
      this.user.username = user.username;
      this.user.email = user.email;
      this.user.password = user.password
      this.userid = parseInt(user.userid);
      let locationid = parseInt(user.locationid)
      if(locationid == 151531 || locationid == 265840 || locationid == 650540){
        $(".locationContainer").fadeIn("slow", () => { });
        this.withOutLocation = false;
        this.userLocation.value = parseInt(user.locationid);
      }else{
        $(".locationContainer").fadeOut("slow", () => { });
        this.withOutLocation = true;
      }
      this.userRol.value = parseInt(user.rolid);
      if(!isNaN(user.employeeid)){
        this.user.employeeid = parseInt(user.employeeid);
      }
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
      $("#userRol").change({ context: context }, handler);
    });
  }

  selectOnChange(event) {
    let context = event.data.context;
    let selectedOption: string = $("#userRol option:selected").text().toString().trim();
    if (selectedOption == "Cliente" || selectedOption == "Administrador") {
      $(".locationContainer").fadeOut("slow", () => { });
      context.withOutLocation = true;
    } else {
      $(".locationContainer").fadeIn("slow", () => { });
      context.withOutLocation = false;
    }
  }

  update() {
    this.clearModalMessages();

    let updatedUser = {
      email: this.user.email,
      employeeid: this.user.employeeid,
      locationid: parseInt($('#userLocation')[0].value),
      userid: this.userid,
      username: this.user.username,
      password: this.user.password,
      rolid: parseInt($('#userRol')[0].value),
    };
    this.showSpinner = true;
    $('.btn').addClass('disabled');
    this.webService.post(updatedUser, "http://localhost/apiFinal/apirest/user/update")
      .then((data) => {
        if (data.invalid.length > 0) {
          this.headerMsj = data.message;
          this.errorMessages = data.invalid;
          this.showErrorMessages();
        } else {
          this.headerMsj = data.message;
          this.user.employeeid = data.employeeid;
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
    $('#modal-admin-update').modal('open');
  }

  showSuccessMessages() {
    $('.modal-content').removeClass('red');
    $('.modal-content').addClass('green');
    $('#modal-admin-update').modal('open');
  }

  

}
