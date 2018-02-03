import { PARAMETERS } from "@angular/core/src/util/decorators";

export class ReservationData {
    reservationId:number;
    guestList:Array<string>;
    reservedDate:any;
    locationId:number;
    ownerId:number;

    
    constructor() {
        this.reservationId = -1;
        this.reservedDate = "";
        this.locationId = 151531;
        this.guestList = new Array<string>();
        this.ownerId = -1;
    }
}
