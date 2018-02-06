import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'app-attendant',
  templateUrl: './attendant.component.html',
  styleUrls: ['./attendant.component.css']
})
export class AttendantComponent implements OnInit {
  reservations:Array<any>;
  showSpinner:boolean;
  constructor(private router: Router, private webService: WebService) {
    this.reservations = new Array<any>();
    this.showSpinner = true;
   }

  ngOnInit() {
    this.webService.post({locationid:localStorage.getItem("locationid")}, "http://localhost/apiFinal/apirest/reservation/reservationsbyattendantid").then(
      (data)=>{
        this.reservations = data.reservations;
        this.showSpinner = false;
      });
  }

  guestListEditor(reservation){
    this.router.navigate(['/registered-user/guestListEditor', reservation]);
  }

  asignEmployeeToEvent(reservation){
    this.router.navigate(['/registered-user/asignEmployee', reservation]);
  }

}
