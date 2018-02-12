import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let rv = "";
    if(value == 151531){
      rv = "CABA";
    }else if(value == 265840){
      rv = "Zona Sur";
    }else if(value == 650540){
      rv = "Zona Norte";
    }else{
      rv = " - ";
    }
    return rv;
  }

}
