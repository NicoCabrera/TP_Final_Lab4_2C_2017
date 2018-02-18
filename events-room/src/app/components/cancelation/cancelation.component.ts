import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';
declare var $;

@Component({
  selector: 'app-cancelation',
  templateUrl: './cancelation.component.html',
  styleUrls: ['./cancelation.component.css']
})
export class CancelationComponent implements OnInit {

  reservations: Array<any>;
  showSpinner: boolean;
  selectedReservation:any;
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

  cancel() {

    let reservation = this.selectedReservation;
    this.showSpinner = true;
    this.webService.post({ reservationid: reservation.reservationid, locationid: localStorage.getItem("locationid")}, "http://localhost/apiFinal/apirest/reservation/cancel").then(
      (data) => {
        $('#modalErrorMsgr').modal('open');
        this.reservations = data.reservations;
        this.showSpinner = false;
      });
  }

  initModal() {
    $(document).ready(function () {
      $('#modalErrorMsgr').modal({dismissible: true});
    });
    $(document).ready(function () {
      $('#confirm').modal();
    });
  }

  setReservationToCancel(reservation){
    this.selectedReservation = reservation;
    $('#confirm').modal('open');
  }

  closeModal(){
    $('#confirm').modal('close');
  }
}
