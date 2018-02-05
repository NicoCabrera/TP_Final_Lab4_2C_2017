import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  helpTitle:string;
  helpText:string;

  constructor() { }

  ngOnInit() {
    
  }

  showHowToReserve(){
    this.helpTitle = "Para realizar una reserva";
    this.helpText = "Debe registrarse con un email y un nombre de usuario. Es totalmente gratuito.";
    $('.tap-target').tapTarget('open');
  }
  showHowToCancel(){
    this.helpTitle = "Para cancelar una reserva";
    this.helpText = "Debe comunicarse telefónicamente. Las reservas se cancelan con 48hs de anticipacion.";
    $('.tap-target').tapTarget('open');
  }

}
