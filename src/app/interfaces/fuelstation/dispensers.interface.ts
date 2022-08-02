import { Assignment, AssignmentHose } from "src/app/models/fuelstation/assignment.model"
import { DispenserReader, GeneralDispenserReader, SideDispenser } from "src/app/models/fuelstation/dispensers.model"
import { Hoses } from "src/app/models/fuelstation/hoses.models"
import { Status } from "src/app/models/status.model"


export interface Dispensers_I {
    dispenser:[] 
}

export interface Assignment_I {
    idAssignments : Assignment
}

export interface SideA_I {
    sideDispenser : SideDispenser
}

export interface SideB_I {
    sideDispenser : SideDispenser
}

export interface AssignmentHose_I {
    assignmentHose : []
}

export interface AssignmentHose_In {
    assignmenHose : AssignmentHose
}

export interface As_I{

    assignmenHose :AssignmentHose
   
}

export interface PreviousGallons_I {
    previousNoGallons : [];
}

export interface DispenserReader_I {
    previousNoGallons :DispenserReader;
}

export interface PenultimateGallons_I {
    penultimateNoGallons : [];
}

export interface PreviousMechanic_I {
    previousNoMechanic : [];
}

export interface PreviousMoney_I {
    previousNoMoney : [];
}

//interface to General Dispenser Reader
export interface TotalGallons_I {
    noGallons : GeneralDispenserReader;
}


export interface ListNumerationDispenser_I {
    listNumerationDispenser : [];
}
export interface GeneralDispenserReader_I{
    generalDispenserReader: GeneralDispenserReader;
}