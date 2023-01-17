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


export class Lubricants {

    constructor(
        public lubricantInvetoryCode: string,
        public lubricantName: string,
        public lubricantCostPrice : number,
        public lubricantSalePrice : number,
        public statusId: Status

    ){}
}
