import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-event-room-viewer',
  templateUrl: './event-room-viewer.component.html',
  styleUrls: ['./event-room-viewer.component.css']
})
export class EventRoomViewerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.slider').slider();
    });
  }

}
