import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-registered-user',
  templateUrl: './registered-user.component.html',
  styleUrls: ['./registered-user.component.css']
})
export class RegisteredUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initSideNav();
  }

  initSideNav(){
    $(".button-collapse").sideNav();
  }
  

}
