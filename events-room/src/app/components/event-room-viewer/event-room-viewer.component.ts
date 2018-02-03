import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
declare var $;
@Component({
  selector: 'app-event-room-viewer',
  templateUrl: './event-room-viewer.component.html',
  styleUrls: ['./event-room-viewer.component.css']
})
export class EventRoomViewerComponent implements OnInit {
  currentLatitude: number;
  currentLongitude: number;
  selectedLatitude: number;
  selectedLongitude: number;
  
  constructor() { }

  ngOnInit() {
    this.initSlider();
    this.initTabs();
    this.setCoordinates();
  }

  initSlider(){
    $(document).ready(function(){
      $('.slider').slider();
    });
  }

  initTabs(){
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }

  changeCoords(lat,long){
    this.selectedLatitude = lat;
    this.selectedLongitude = long;
  }

  setCoordinates() {
    
    $.getJSON('//freegeoip.net/json/?callback=?', (data) => {
      this.currentLatitude = data.latitude;
      this.currentLongitude = data.longitude;
    });
    this.selectedLatitude = -34.6667;
    this.selectedLongitude = -58.5167;

  }
}
