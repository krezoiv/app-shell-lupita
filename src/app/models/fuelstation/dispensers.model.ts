import { Status } from "../status.model";
import { AssignmentHose } from "./assignment.model";
import { Island } from "./island.models";

export class Dispensers {

    constructor(
        public dispenserCode? : string,
        public islandId? : Island,
        public statusId? : Status,
        public dispenserId? : string

    ){}
}

export class SideDispenser{

    constructor(
        public sideName? : string,
        public sideId? : string
    ){}
}

export class GeneralDispenserReader {

    constructor(
        public totalFuelA? : string ,
        public totalFuelB? : number, 
        public totalFuelC? : number,  
        public totalFuelD? : number,  
        public readingDate? : string, 
        public generalDispenserReaderId? : string
    ){}
}

export class DispenserReader{

    constructor(
        public previousNoGallons? : number,
        public actualNoGallons? : number,
        public totalNoGallons? : number,
        public previousNoMechanic? : number,
        public actualNoMechanic? : number,
        public totalNoMechanic? : number,
        public previousNoMoney? : number,
        public actualNoMoney? : number,
        public totalNoMoney? : number,
        public assignmentHoseId? : AssignmentHose,
        public generalDispenserReaderId? : GeneralDispenserReader
        

    ){}
}