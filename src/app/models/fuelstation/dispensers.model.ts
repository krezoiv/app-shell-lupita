import { Status } from "../status.model";
import { AssignmentHose } from "./assignment.model";
import { Island } from "./island.models";

export class Dispensers {

    constructor(
        public dispenserCode?: string,
        public islandId?: Island,
        public statusId?: Status,
        public dispenserId?: string

    ) { }
}

export class SideDispenser {

    constructor(
        public sideName?: string,
        public sideId?: string
    ) { }
}

export class GeneralDispenserReader {

    constructor(
        public applied? : boolean,
        public totalGallonRegular?: number,
        public totalMechanicRegular?: number,
        public totalMoneyRegular?: number,
        public totalGallonSuper?: number,
        public totalMechanicSuper?: number,
        public totalMoneySuper?: number,
        public totalGallonDiesel?: number,
        public totalMechanicDiesel?: number,
        public totalMoneyDiesel?: number,
        public totalGallonVpower?: number,
        public totalMechanicVpower?: number,
        public totalMoneyVpower?: number,
        public generalDispenserReaderId?: string,
       
    ) { }
}


export class DispenserReader {

    constructor(
        public previousNoGallons?: number,
        public actualNoGallons?: number,
        public totalNoGallons?: number,
        public previousNoMechanic?: number,
        public actualNoMechanic?: number,
        public totalNoMechanic?: number,
        public previousNoMoney?: number,
        public actualNoMoney?: number,
        public totalNoMoney?: number,
        public assignmentHoseId?: AssignmentHose,
        public generalDispenserReaderId?: GeneralDispenserReader,
        public dispenserReaderId? : number

    ) { }
}