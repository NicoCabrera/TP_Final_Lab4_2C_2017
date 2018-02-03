import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';
import { ReservationData } from '../../classes/reservation-data';
import { IMyDpOptions, IMyDate } from 'mydatepicker';
declare var $;
declare var Materialize;

@Component({
  selector: 'app-lounge-reservation',
  templateUrl: './lounge-reservation.component.html',
  styleUrls: ['./lounge-reservation.component.css']
})
export class LoungeReservationComponent implements OnInit {
  reservationData: ReservationData;
  reservedDate = { formatted: "" };
  showSpinner: boolean;
  myDatePickerOptions: IMyDpOptions;
  showGuestList: boolean;
  guestName: string;
  guestLastname: string;
  totalGuests: number;
  constructor(private fb: FormBuilder, private router: Router, private webService: WebService) {
    this.reservationData = new ReservationData();
    this.showSpinner = false;
    this.showGuestList = false;
    this.clearGuestData();
    this.checkReservations();
    this.initSelect();
    this.initModal();
    this.totalGuests = 0;
  }

  ngOnInit() {
    
  }

  clearGuestData() {
    this.guestName = "";
    this.guestLastname = "";
  }

  checkReservations(){
    this.webService.post({jwt: localStorage.getItem("token")},"http://localhost/apiFinal/apirest/reservation/checkreservations").then(
      (data)=>{
        this.configPickDate(data.reservedDates);
      }
    );
  }

  initSelect() {
    $(document).ready(function () {
      $('select').material_select();
    });
  }

  initModal() {
    $(document).ready(function () {
      $('.modal').modal();
    });
  }

  configPickDate(disableDays:Array<IMyDate>) {
    let today = new Date();
    let until = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };

    this.myDatePickerOptions = {
      dateFormat: 'dd.mm.yyyy',
      dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
      monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
      showTodayBtn: false,
      maxYear: until.year + 1,
      minYear: until.year,
      disableDays: disableDays,
      width: "100%",
      editableDateField: false,
      disableUntil: until,
      showClearDateBtn: false,
    };
  }

  submitOnClick() {
    let data = new ReservationData();
    data.locationId = $('select')[0].value;
    if (this.reservedDate.formatted != "") {
      data.reservedDate = this.reservedDate.formatted;
    }
    if (this.reservationData.guestList.length > 0 && (this.showGuestList == true)) {
      data.guestList = this.reservationData.guestList;
    }
    if(this.validateData(data)){
      this.saveReservation(data);
    }
  }

  saveReservation(data){
    this.showSpinner = true;
    $('.btn').addClass('disabled');
    let newReservation = {
      reservedDate: data.reservedDate,
      locationId: data.locationId,
      guestList: JSON.stringify(data.guestList),
      jwt: localStorage.getItem("token")
    };
   
    this.webService.post(newReservation,"http://localhost/apiFinal/apirest/reservation/add").then(
      data =>{
         this.showSpinner = false;
         $('.modal').modal('open');
         $('.btn').removeClass('disabled');
      });
  }

  validateData(data: ReservationData) {
    let rv = false;
    if (data.reservedDate === "") {
      Materialize.toast("Debe fijar una fecha", 4000);
    }else{
      rv = true
    }
    return rv;
  }

  showGuestListValue() {
    console.log(this.showGuestList);
  }

  addGuest() {
    if (this.validateGuest()) {
      let guest: string = this.guestName + " " + this.guestLastname;
      this.reservationData.guestList.push(guest);
      this.clearGuestData();
      this.totalGuests = this.reservationData.guestList.length;
    }
  }

  validateGuest() {
    let message = "";
    let rv = false;
    if (this.guestName == "") {
      message += "Ingrese el nombre del invitado.";
    }
    if (this.guestLastname == "") {
      if(message != ""){
        message += "<br>";
      }
      message += "Ingrese el apellido del invitado.";
    }
    if(message != ""){
      Materialize.toast(message, 4000);
    }else{
      rv = true;
    }
    return rv;

  }

  deleteGuest(index) {
    this.reservationData.guestList.splice(index, 1);
    this.totalGuests = this.reservationData.guestList.length;
  }

  goToReservationsViewer(){
    this.router.navigateByUrl("/registered-user/reservationsViewer");
  }
}
