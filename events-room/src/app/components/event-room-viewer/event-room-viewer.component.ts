import { Component, OnInit, ViewChild } from '@angular/core';
import { DirectionsRenderer } from '@ngui/map';
declare var $;
@Component({
  selector: 'app-event-room-viewer',
  templateUrl: './event-room-viewer.component.html',
  styleUrls: ['./event-room-viewer.component.css']
})
export class EventRoomViewerComponent implements OnInit {
  
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  directionsRenderer: google.maps.DirectionsRenderer;
  direction: any = {
    origin: '',
    destination: '',
    travelMode: 'DRIVING'
  };
  
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
    this.direction.destination = this.selectedLatitude + "," + this.selectedLongitude;
    this.directionsRendererDirective['showDirections'](this.direction);
  }

  setCoordinates() {
    
    $.getJSON('//freegeoip.net/json/?callback=?', (data) => {
      this.currentLatitude = data.latitude;
      this.currentLongitude = data.longitude;
      this.direction.origin = this.currentLatitude + "," + this.currentLongitude;
    });
    this.selectedLatitude = -34.6667;
    this.selectedLongitude = -58.5167;

    this.direction.destination = this.selectedLatitude + "," + this.selectedLongitude;
    
  }
}
