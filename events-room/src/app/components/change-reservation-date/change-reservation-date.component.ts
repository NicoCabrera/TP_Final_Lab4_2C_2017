import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';
declare var $;
@Component({
  selector: 'app-change-reservation-date',
  templateUrl: './change-reservation-date.component.html',
  styleUrls: ['./change-reservation-date.component.css']
})
export class ChangeReservationDateComponent implements OnInit {

  reservations: Array<any>;
  showSpinner: boolean;
  showNoContentMessage:boolean;
  constructor(private router: Router, private webService: WebService) {
    this.reservations = new Array<any>();
    this.showSpinner = true;
    this.showNoContentMessage = false;
    this.initModal();
  }

  ngOnInit() {
    
    this.webService.post({ locationid: localStorage.getItem("locationid") }, "http://localhost/apiFinal/apirest/reservation/reservationsbyattendantid").then(
      (data) => {
        this.reservations = data.reservations;
        if(this.reservations.length == 0){
          this.showNoContentMessage = true;
        }
        this.showSpinner = false;
      });
  }

  changeDate(reservation) {
    this.router.navigate(['/registered-user/change-date', reservation]);
  }

  initModal() {
    $(document).ready(function () {
      $('.modal').modal({dismissible: true});
    });
  }

}
