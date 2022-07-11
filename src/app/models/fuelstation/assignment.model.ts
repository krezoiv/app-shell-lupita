import { Status } from "../status.model";
import { Dispensers } from "./dispensers.model";
import { Hoses, SideDispenser } from "./hoses.models";


export class Assignment {

    constructor(
        public dispenserId? : Dispensers,
        public assignmentId? : string
    ){}
};

export class AssignmentHose {

    constructor(
       
        public position? : number,
        public hoseId? : Hoses,
        public sideId? : SideDispenser,
        public assignmentId? : Assignment,
        public statusId?: Status,
        public assignmentHoseId? : string
     
    ){}

}