import { User } from "./user";

export class Employee extends User{
    locationid:number;
    constructor() {
        super();
        this.locationid = -1;
        
    }
}