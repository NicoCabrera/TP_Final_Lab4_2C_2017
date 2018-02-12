import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol'
})
export class RolPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let rv = "";
    if (value == 221548621) {
      rv = "Empleado";
    } else if (value == 535751) {
      rv = "Cliente";
    } else if (value == 96312471) {
      rv = "Encargado";
    } else if (value == 88107751) {
      rv = "Administrador";
    } else {
      rv = " - ";
    }
    return rv;
  }

}
