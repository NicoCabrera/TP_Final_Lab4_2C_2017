import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'app-reservations-viewer',
  templateUrl: './reservations-viewer.component.html',
  styleUrls: ['./reservations-viewer.component.css']
})
export class ReservationsViewerComponent implements OnInit {
  reservations:Array<any>;
  showSpinner:boolean;
  showNoContentMessage:boolean;


  constructor(private router: Router, private webService: WebService) {
    this.reservations = new Array<any>();
    this.showSpinner = true;
    this.showNoContentMessage = false;
   }

  ngOnInit() {

    this.webService.post({jwt:localStorage.getItem("token")}, "http://localhost/apiFinal/apirest/reservation/myreservations").then(
      (data)=>{
        this.reservations = data.reservations;
        if(this.reservations.length == 0){
          this.showNoContentMessage = true;
        }
        this.showSpinner = false;
      });
  }

  guestListEditor(reservation){
    this.router.navigate(['/registered-user/guestListEditor', reservation]);
  }

}
