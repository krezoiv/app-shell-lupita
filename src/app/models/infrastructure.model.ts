import { Status } from "./status.model";

export class Fuels {

    constructor(
        public fuelName : string,
        public costPrice : number,
        public salePrice : number,
        public statusId : Status
    ){}
}