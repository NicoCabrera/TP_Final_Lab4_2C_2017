import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebService } from '../../services/web.service';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { ReservationData } from '../../classes/reservation-data';
declare var $;
declare var Materialize;
@Component({
  selector: 'app-change-date',
  templateUrl: './change-date.component.html',
  styleUrls: ['./change-date.component.css']
})
export class ChangeDateComponent implements OnInit {
  reservation: any;
  showSpinner: boolean;
  reservedDates: any;
  myDatePickerOptions: IMyDpOptions;
  reservedDate = { formatted: "" };
  constructor(private router: Router, private route: ActivatedRoute, private webService: WebService) {
    this.initModal();
  }

  initModal() {
    $(document).ready(function () {
      $('.modal').modal();
    });
  }

  ngOnInit() {
    this.route.params.subscribe((reservation) => {
      this.reservation = reservation;
      this.webService.post({ locationid: this.reservation.locationid }, "http://localhost/apiFinal/apirest/reservation/checkreservationsbylocation").then(
        (data) => {
          this.reservedDates = data.reservedDates;
          this.configPickDate(data.reservedDates);
        }
      );

    });
  }

  configPickDate(disableDays: Array<IMyDate>) {
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
    if (this.reservedDate.formatted != "") {
      data.reservationId = this.reservation.reservationid;
      data.reservedDate = this.reservedDate.formatted;
    }
    if (this.validateData(data)) {
      this.updateDate(data);
    }
  }

  validateData(data: ReservationData) {
    let rv = false;
    if (data.reservedDate === "") {
      Materialize.toast("Debe fijar una nueva fecha", 4000);
    } else {
      rv = true
    }
    return rv;
  }

  updateDate(data) {
    this.showSpinner = true;
    $('.btn').addClass('disabled');
    this.webService.post(data, "http://localhost/apiFinal/apirest/reservation/updatedate").then(
      (data) => {
        this.showSpinner = false;
        $('.modal').modal('open');
        $('.btn').removeClass('disabled');
      }
    );
  }


  goToChangeReservationDate() {
    this.router.navigateByUrl("/registered-user/change-reservation-date");
  }

}
