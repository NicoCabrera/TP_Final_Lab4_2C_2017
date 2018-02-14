import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-charts-quiz',
  templateUrl: './charts-quiz.component.html',
  styleUrls: ['./charts-quiz.component.css']
})
export class ChartsQuizComponent implements OnInit {
  // Pie
  public pieChartLabels: string[] = ['Confusa', 'Adecuada', 'Óptima'];
  public pieChartType: string = 'pie';
  public pieChartData: number[] =
    [parseInt(localStorage.getItem('confuse')),
    parseInt(localStorage.getItem('appropiate')),
    parseInt(localStorage.getItem('optimum'))];

  public pieChartLabels2: string[] = ['Malo', 'Regular', 'Bueno', 'Muy Bueno'];
  public pieChartData2: number[] =  [parseInt(localStorage.getItem('bad')),
  parseInt(localStorage.getItem('regular')),
  parseInt(localStorage.getItem('good')),
  parseInt(localStorage.getItem('verygood'))
];

  public pieChartColors:Array<any> = [
    { 
      backgroundColor: ["#ef9a9a", "#ffe082", "#90caf9", "#a5d6a7"] ,
    },
  ];
  constructor(private router: Router, private webService: WebService, private excelService:ExcelService) {
  }

  ngOnInit() {

  }
  downloadFile(){
    this.webService.post({ locationid: localStorage.getItem("locationid") }, "http://localhost/apiFinal/apirest/user/answerstoexcel").then(
      (data) => {
        this.excelService.exportAsExcelFile(data.answers,"ResultadoDeEncuestas");
      });
  }
}
