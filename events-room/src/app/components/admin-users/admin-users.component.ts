import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {
    this.initTabs();
  }




  initTabs(){
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }

  
}
