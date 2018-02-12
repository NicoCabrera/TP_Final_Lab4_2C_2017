import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Answer } from '../../classes/answer';
import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';
declare var $;
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  showSpinner:boolean;
  radioQuestion2: string;
  radioQuestion3: string;
  radioQuestion4: string;
  radioQuestion5: string;
  checkQuestion6Option1: any = false;
  checkQuestion6Option2: any = false;
  checkQuestion6Option3: any = false;
  checkQuestion6Option4: any = false;
  radioQuestion7: string;
  suggestion: string;
  selectedOption: CustomOption;
  options1 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ];
  options = [
    { name: "Opcion1", value: 1 },
    { name: "Opcion2", value: 2 }
  ]


  constructor(private router: Router, private webService: WebService) {
    this.selectedOption = new CustomOption();
    this.radioQuestion2 = "Adecuada";
    this.radioQuestion3 = "Muy Bueno";
    this.radioQuestion4 = "Si";
    this.radioQuestion5 = "Si";
    this.radioQuestion7 = "Si";
    this.suggestion = "";

    this.showSpinner = false;
  }

  ngOnInit() {
    this.initSelect();
    this.initModal();
    this.initCharacterCounter();
  }

  initSelect(){
    $(document).ready(function () {
      $('select').material_select();
    });
  }

  initCharacterCounter(){
    $(document).ready(function() {
      $('#textarea1').characterCounter();
    });
  }

  submitOnClick() {

    this.showSpinner = true;
    $('.btn').addClass('disabled');


    let chosenday: boolean = this.radioQuestion4 == "Si" ? true : false;
    let rehire: boolean = this.radioQuestion5 == "Si" ? true : false;
    let sendoffersbyemail: boolean = this.radioQuestion7 == "Si" ? true : false;

    let answer = new Answer(parseInt($('#selectForQuestion1')[0].value),
      this.radioQuestion2,
      this.radioQuestion3,
      chosenday,
      rehire,
      this.checkQuestion6Option1,
      this.checkQuestion6Option2,
      this.checkQuestion6Option3,
      this.checkQuestion6Option4,
      sendoffersbyemail,
      this.suggestion.substring(0,300));


      this.webService.post({jwt:localStorage.getItem("token"), answer: answer }, "http://localhost/apiFinal/apirest/answer/save").then(
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


  selectOnChange(event) {

    event.data.currentZoneSelected[0] = $("select option:selected").text();
    if (event.data.currentZoneSelected[0] != event.data.previousZoneSelected[0]) {
      event.data.context.clearReservedDate();
    }
    event.data.previousZoneSelected[0] = event.data.currentZoneSelected[0];
  }

  goToReservationsViewer(){
    this.router.navigateByUrl("/registered-user/reservationsViewer");
  }
}
export class CustomOption {
  name: string;
  value: number;

  constructor() {
    this.name = "Opcion1";
    this.value = 10;
  }
}
