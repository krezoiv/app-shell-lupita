import { Status } from "./status.model";

export class Lubricants {

    constructor(
        public lubricantInvetoryCode : string,
        public lubricantName : string,
        public lubricantCostPrice : number,
        public lubricantSalePrice : number,
        public statusId : Status
    )
    {}
}

export class LubricantsInventory {

    constructor(
        public lubricantInvetoryCode : string,
        public lubricantId : Lubricants,
        public lubricantAvailable : number
    ){}
}

