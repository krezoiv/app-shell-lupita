import { Taxes } from "./purchase/taxes.model";
import { Status } from "./status.model";

export class Fuels {

    constructor(
       
        public fuelName?: string,
        public costPrice? : number,
        public salePrice? : number,
        public statusId? : Status,
        public fuelId? : string,
        public taxesId? : Taxes
      
    ){}
}
