import { Component, OnInit } from '@angular/core';
import { Customer } from '../../classes/customer';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-registered-user',
  templateUrl: './registered-user.component.html',
  styleUrls: ['./registered-user.component.css']
})
export class RegisteredUserComponent implements OnInit {
  user: Customer;
  permissions:Array<string>;
  constructor(private router: Router) { 
    this.user = new Customer();
    this.permissions = new Array<string>();
  }

  ngOnInit() {
    this.initSideNav();
    this.setInitialValues();
  }

  initSideNav(){
    $(".button-collapse").sideNav({
      closeOnClick: true
    });
  }

  setInitialValues(){
    this.user.username = localStorage.getItem("username");
    this.user.email = localStorage.getItem("email");
    this.permissions = JSON.parse(localStorage.getItem("permissions"));
  }
  
  logout(){
    $('.button-collapse').sideNav('destroy');
    this.router.navigateByUrl('/');
    localStorage.clear();
  }

}
