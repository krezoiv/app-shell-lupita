import { Status } from "./status.model";

export class Fuels {

    constructor(
       
        public fuelName : string,
        public costPrice : string,
        public salePrice : string,
        public statusId : Status,
        public fuelIs? : string
      
    ){}
}
