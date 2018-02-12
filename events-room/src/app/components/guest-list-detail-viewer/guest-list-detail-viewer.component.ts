import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'app-guest-list-detail-viewer',
  templateUrl: './guest-list-detail-viewer.component.html',
  styleUrls: ['./guest-list-detail-viewer.component.css']
})
export class GuestListDetailViewerComponent implements OnInit {
  guestlist: Array<any>;
  totalGuests:number;
  constructor(private router: Router, private route: ActivatedRoute, private webService: WebService) {
    this.guestlist = new Array<any>();
   }

  ngOnInit() {
    this.route.params.subscribe((reservation) => {
      this.guestlist = JSON.parse(reservation.guestlist).sort((a,b)=>{
        if(a.lastname > b.lastname){
          return 1;
        }
        if(a.lastname < b.lastname){
          return  -1;
        }
        return 0;
      });
      this.totalGuests = this.guestlist.length;
    });
  }

}
