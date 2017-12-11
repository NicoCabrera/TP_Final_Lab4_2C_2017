export class DataResponse{
    message:string;
    invalid:Array<string>;
    data:Array<any>;
    status:number;

    constructor() {
        this.message = "";
        this.invalid = new Array<string>();   
        this.data = new Array<any>();
        this.status = 0;   
    }
}