import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
declare var $;
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  constructor(private webService: WebService) {

  }

  ngOnInit() {
    this.initTabs();
    this.webService.post({ locationid: localStorage.getItem("locationid") }, "http://localhost/apiFinal/apirest/user/answers").then(
      (data) => {
        localStorage.setItem('confuse',data.confuse);
        localStorage.setItem('appropiate',data.appropiate);
        localStorage.setItem('optimum',data.optimum);

        localStorage.setItem('bad',data.bad);
        localStorage.setItem('regular',data.regular);
        localStorage.setItem('good',data.good);
        localStorage.setItem('verygood',data.verygood);
      });
  }




  initTabs(){
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }

  
}
