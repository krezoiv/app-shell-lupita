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

//ok
export interface previousNoGallonsDiesel_I {
    previousNoGallonsDiesel : [];
}

export interface previousNoMechanicDiesel_I {
    previousNoMechanicDiesel : [];
}

export interface previousNoMoneyDiesel_I {
    previousNoMoneyDiesel : [];
}



//ok
export interface previousNoGallonsRegular_I {
    previousNoGallonsRegular :DispenserReader;
}
//ok
export interface DispenserReaderSuper_I {
    previousNoGallonsSuper1 :DispenserReader;
}

//ok
export interface previousNoMechanicSuper1_I {
    previousNoMechanicSuper1 :DispenserReader;
}
//ok
export interface previousNoMechanicRegular_I {
    previousNoMechanicRegular :DispenserReader;
}
//ok
export interface previousNoMoneySuper1_I {
    previousNoMoneySuper1 :DispenserReader;
}
//ok
export interface previousNoMoneyRegular_I {
    previousNoMoneyRegular :DispenserReader;
}

//ok
export interface previousNoGallonsSuper_I {
    previousNoGallonsSuper : [];
}

//ok
export interface previousNoGallons_I {
    previousNoGallons : [];
}


//ok
export interface previousNoMechanicSuper_I {
    previousNoMechanicSuper : [];
}

//ok
export interface previousNoMoneySuper_I {
    previousNoMoneySuper : [];
}


export interface PenultimateGallons_I {
    penultimateNoGallons : [];
}
//ok
export interface previousNoMechanicR_I {
    previousNoMechanicR : [];
}

//ok
export interface previousNoMoneyR_I {
    previousNoMoneyR : [];
}

export interface previousNoGallonsDiesel1_I {
    previousNoGallonsDiesel1 :DispenserReader;
}

export interface previousNoMechanicDiesel1_I {
    previousNoMechanicDiesel1 :DispenserReader;
}

export interface previousNoMoneyDiesel1_I {
    previousNoMoneyDiesel1 :DispenserReader;
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