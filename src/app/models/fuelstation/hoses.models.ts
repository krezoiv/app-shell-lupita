import { Fuels } from "../infrastructure.model";
import { Status } from "../status.model";


export class Hoses {

    constructor(
        public hoseColor? : string,
        public fuelId? : Fuels,
        public statusId? : Status,
        public hoseId? : string
    ){}
}

export class SideDispenser {

    constructor(
        public sideName? : string,
        public sideId? : string
    ){}

}