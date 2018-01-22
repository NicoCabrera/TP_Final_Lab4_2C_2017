export class User{

    public username: string;
    public email: string;
    public password: string;
    public rolid:number;

    constructor() {
        this.username = "";
        this.email = "";
        this.password = "";
        this.rolid = -1;
    }
}