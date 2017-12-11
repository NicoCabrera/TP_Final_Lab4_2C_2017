import { Address } from "./address";
import { User } from "./user";

export class Customer extends User {
    public address: Address;

    constructor() {
        super();
        this.address = new Address();
    }
}
