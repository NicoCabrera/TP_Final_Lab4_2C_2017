import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';
import { ArgumentType } from '@angular/core/src/view';
import * as jsPDF from 'jspdf';
declare var $;
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  public barChartLabels: string[];

  showSpinner: boolean;
  constructor(private router: Router, private webService: WebService) {
    this.barChartLabels = JSON.parse(localStorage.getItem("barChartLabels"));
    this.showSpinner = false;
  }
  ngOnInit() {
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: JSON.parse(localStorage.getItem("canceled")), label: 'Canceladas' },
    { data: JSON.parse(localStorage.getItem("accepted")), label: 'Aceptadas' }
  ];

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  downloadEventsCanceledDetails() {

    this.showSpinner = true;
    $('.btn').addClass('disabled');
    this.webService.post({ jwt: localStorage.getItem("token") }, "http://localhost/apiFinal/apirest/reservation/activestatusforpdfreport").then(
      data => {
        let count = 1;
        let x = 10;
        let y = 30;
        const doc = new jsPDF();
        doc.setFontSize(15);
        doc.text(60, 10, 'Eventos de los ultimos 6 meses');
        doc.text(30, 20, 'FECHA');
        doc.text(90, 20, 'LUGAR');
        doc.text(150, 20, 'ESTADO');
        data.data.forEach(element => {
          if (count == 27) {
            doc.addPage();
            count = 1;
            y = 30;
            doc.setFontSize(15);
            doc.text(60, 10, 'Eventos de los ultimos 6 meses');
            doc.text(30, 20, 'FECHA');
            doc.text(90, 20, 'LUGAR');
            doc.text(150, 20, 'ESTADO');
          }
          
          doc.setFontSize(8);
          doc.text(30, y, element.date);
          doc.text(90, y, element.place);
          let status = "OK";
          if (element.status == 0) {
            status = "Cancelada";
          }
          doc.text(150, y, status);
          doc.text(15,(y-7),"_____________________________________________________________________________________________________________")
          y = y + 10;
          count++;
        });

        doc.save('prueba.pdf');

        this.showSpinner = false;
        $('.modal').modal('open');
        $('.btn').removeClass('disabled');
      });

  }

}
