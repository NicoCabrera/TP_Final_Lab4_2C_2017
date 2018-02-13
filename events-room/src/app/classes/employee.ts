import { User } from "./user";

export class Employee extends User{
    locationid:number;
    employeeid:number;
    constructor() {
        super();
        this.locationid = -1;
        this.employeeid = -1;
    }
}