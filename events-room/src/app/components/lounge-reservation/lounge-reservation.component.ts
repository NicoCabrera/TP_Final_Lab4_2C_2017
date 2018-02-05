import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';
import { ReservationData } from '../../classes/reservation-data';
import { IMyDpOptions, IMyDate } from 'mydatepicker';
import { EventEmitter } from 'events';
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
  reservedDates: any;
  myDatePickerOptions: IMyDpOptions;
  myDatePickerOptionsSUR: IMyDpOptions;
  myDatePickerOptionsNORTE: IMyDpOptions;
  showGuestList: boolean;
  guestName: string;
  guestLastname: string;
  totalGuests: number;
  disabledDaysCABA: Array<IMyDate>;
  currentZoneSelected:Array<string>;
  previousZoneSelected:Array<string>;

  constructor(private fb: FormBuilder, private router: Router, private webService: WebService) {
    this.reservationData = new ReservationData();
    this.disabledDaysCABA = new Array<IMyDate>();
    this.showSpinner = false;
    this.showGuestList = false;
    this.currentZoneSelected = ["CABA"];
    this.previousZoneSelected = ["CABA"];
    this.clearGuestData();
    this.initSelect();
    this.initModal();
    this.totalGuests = 0;
    
  }

  clearReservedDate(){
    this.reservedDate = { formatted: "" };
    console.log("Evento fue atrapado");
  }

  ngOnInit() {
    this.checkReservations();
  }

  clearGuestData() {
    this.guestName = "";
    this.guestLastname = "";
  }

  checkReservations() {
    this.webService.post({ jwt: localStorage.getItem("token") }, "http://localhost/apiFinal/apirest/reservation/checkreservations").then(
      (data) => {
        this.reservedDates = data.reservedDates;
        this.disabledDaysCABA = data.reservedDates.CABA
        this.configPickDateCABA(data.reservedDates.CABA);
      }
    );
  }

  initSelect() {
    var currentZoneSelected = this.currentZoneSelected;
    let previousZoneSelected = this.previousZoneSelected;
    var context = this;
    var handler = this.selectOnChange;
    $(document).ready(function () {
      $('select').material_select();
      $("select").change({currentZoneSelected: currentZoneSelected, context: context, previousZoneSelected: previousZoneSelected },handler);
    });

  }

  selectOnChange(event) {
    
    event.data.currentZoneSelected[0] = $("select option:selected" ).text();
    if(event.data.currentZoneSelected[0] != event.data.previousZoneSelected[0]){
      event.data.context.clearReservedDate();
    }
    event.data.previousZoneSelected[0] = event.data.currentZoneSelected[0];
  }

  initModal() {
    $(document).ready(function () {
      $('.modal').modal();
    });
  }

  configPickDateCABA(disableDays: Array<IMyDate>) {
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

    this.myDatePickerOptionsSUR = {
      dateFormat: 'dd.mm.yyyy',
      dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
      monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
      showTodayBtn: false,
      maxYear: until.year + 1,
      minYear: until.year,
      disableDays: this.reservedDates.SUR,
      width: "100%",
      editableDateField: false,
      disableUntil: until,
      showClearDateBtn: false,
    };
    this.myDatePickerOptionsNORTE = {
      dateFormat: 'dd.mm.yyyy',
      dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
      monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
      showTodayBtn: false,
      maxYear: until.year + 1,
      minYear: until.year,
      disableDays: this.reservedDates.NORTE,
      width: "100%",
      editableDateField: false,
      disableUntil: until,
      showClearDateBtn: false,
    };
  }

  submitOnClick() {
    console.log(this.currentZoneSelected[0]);
    let data = new ReservationData();
    data.locationId = $('select')[0].value;
    if (this.reservedDate.formatted != "") {
      data.reservedDate = this.reservedDate.formatted;
    }
    if (this.reservationData.guestList.length > 0 && (this.showGuestList == true)) {
      data.guestList = this.reservationData.guestList;
    }
    if (this.validateData(data)) {
      console.log(this.reservedDate);
      //this.saveReservation(data);
    }
  }

  saveReservation(data) {
    this.showSpinner = true;
    $('.btn').addClass('disabled');
    let newReservation = {
      reservedDate: data.reservedDate,
      locationId: data.locationId,
      guestList: JSON.stringify(data.guestList),
      jwt: localStorage.getItem("token")
    };

    this.webService.post(newReservation, "http://localhost/apiFinal/apirest/reservation/add").then(
      data => {
        this.showSpinner = false;
        $('.modal').modal('open');
        $('.btn').removeClass('disabled');
      });
  }

  validateData(data: ReservationData) {
    let rv = false;
    if (data.reservedDate === "") {
      Materialize.toast("Debe fijar una fecha", 4000);
    } else {
      rv = true
    }
    return rv;
  }


  addGuest() {
    if (this.validateGuest()) {
      let guest = { name: this.guestName, lastname: this.guestLastname };
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
      if (message != "") {
        message += "<br>";
      }
      message += "Ingrese el apellido del invitado.";
    }
    if (message != "") {
      Materialize.toast(message, 4000);
    } else {
      rv = true;
    }
    return rv;

  }

  deleteGuest(index) {
    this.reservationData.guestList.splice(index, 1);
    this.totalGuests = this.reservationData.guestList.length;
  }

  goToReservationsViewer() {
    this.router.navigateByUrl("/registered-user/reservationsViewer");
  }
}
