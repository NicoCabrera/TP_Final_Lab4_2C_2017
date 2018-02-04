import { PARAMETERS } from "@angular/core/src/util/decorators";

export class ReservationData {
    reservationId:number;
    guestList:Array<any>;
    reservedDate:any;
    locationId:number;
    ownerId:number;

    
    constructor() {
        this.reservationId = -1;
        this.reservedDate = "";
        this.locationId = 151531;
        this.guestList = new Array<any>();
        this.ownerId = -1;
    }
}
