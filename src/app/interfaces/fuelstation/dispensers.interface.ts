import { Assignment } from "src/app/models/fuelstation/assignment.model"
import { SideDispenser } from "src/app/models/fuelstation/dispensers.model"


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