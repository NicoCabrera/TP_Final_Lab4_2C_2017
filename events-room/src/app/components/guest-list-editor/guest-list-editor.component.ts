import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router/src/shared';
declare var $;
declare var Materialize;

@Component({
  selector: 'app-guest-list-editor',
  templateUrl: './guest-list-editor.component.html',
  styleUrls: ['./guest-list-editor.component.css']
})
export class GuestListEditorComponent implements OnInit {

  guestlist: any;
  totalGuests: number;
  tables: Array<Array<any>>;
  tableNumbers: Array<any>;
  tableNumberIndex: number;
  guestName: string;
  guestLastname: string;
  showSpinner: boolean;
  reservationid: number;

  constructor(private router: Router, private route: ActivatedRoute, private webService: WebService) {
    this.showSpinner = false;
    this.initSelect();
    this.initModal();
    this.tableNumbers = ["Sin asignar", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.clearGuestData();
  }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.reservationid = data.reservationid;
      this.guestlist = JSON.parse(data.guestlist);
      this.totalGuests = this.guestlist.length;
    });
  }

  deleteGuest(index) {
    this.guestlist.splice(index, 1);
    this.totalGuests = this.guestlist.length;
  }


  initSelect() {
    $(document).ready(function () {
      $('select').material_select();
    });
  }

  clearGuestData() {
    this.guestName = "";
    this.guestLastname = "";
  }

  addGuest() {
    if (this.validateGuest()) {
      let guest = {};
      if ("Sin asignar" != $('select')[0].value) {
        guest = { name: this.guestName, lastname: this.guestLastname, tnumber: $('select')[0].value };
      } else {
        guest = { name: this.guestName, lastname: this.guestLastname, tnumber: "" };
      }
      if(this.checkNumberOfPeoplePerTable(guest)){
        this.guestlist.push(guest);
      this.clearGuestData();
      this.totalGuests = this.guestlist.length;
      }else{
        Materialize.toast("Solo se permite 10 personas por mesa", 4000);
      }
      
    }
  }


  checkNumberOfPeoplePerTable(gst): boolean {
    let count = 0;
    let rv = true;

    if (gst.tnumber != "") {
      this.guestlist.forEach(guest => {
        if (guest.tnumber == gst.tnumber) {
          count++;
        }
      });
      if (count >= 10) {
        rv = false;
      }
    }
    return rv;
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

  saveReservation() {
    this.showSpinner = true;
    $('.btn').addClass('disabled');
    let reservationDetail = {
      reservationid: this.reservationid,
      guestList: JSON.stringify(this.guestlist),
      jwt: localStorage.getItem("token")
    };

    this.webService.post(reservationDetail, "http://localhost/apiFinal/apirest/reservation/updatelist").then(
      data => {
        this.showSpinner = false;
        $('.modal').modal('open');
        $('.btn').removeClass('disabled');
      });
  }


  initModal() {
    $(document).ready(function () {
      $('.modal').modal();
    });
  }

}
