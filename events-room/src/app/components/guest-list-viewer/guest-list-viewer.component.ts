import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'app-guest-list-viewer',
  templateUrl: './guest-list-viewer.component.html',
  styleUrls: ['./guest-list-viewer.component.css']
})
export class GuestListViewerComponent implements OnInit {
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
    this.router.navigate(['/registered-user/guest-list-detail-viewer', reservation]);
  }

}
