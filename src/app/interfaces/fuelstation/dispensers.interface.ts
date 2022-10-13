import { Assignment, AssignmentHose } from "src/app/models/fuelstation/assignment.model"
import { DispenserReader, Dispensers, GeneralDispenserReader, SideDispenser } from "src/app/models/fuelstation/dispensers.model"
import { Hoses } from "src/app/models/fuelstation/hoses.models"
import { Fuels } from "src/app/models/infrastructure.model"
import { Taxes } from "src/app/models/purchase/taxes.model"
import { Status } from "src/app/models/status.model"


export interface Dispensers_I {
    dispenser: []
}


export interface DispensersA_I {
    dispenserA: []
}

export interface DispensersB_I {
    dispenserB: []
}
export interface Assignment_I {
    idAssignments: Assignment
}

export interface SideA_I {
    sideDispenser: SideDispenser
}

export interface SideB_I {
    sideDispenser: SideDispenser
}

export interface AssignmentHose_I {
    assignmentHose: []
}

export interface AssignmentHose_In {
    assignmenHose: AssignmentHose
}

export interface As_I {

    assignmenHose: AssignmentHose

}

//ok
export interface previousNoGallonsDiesel_I {
    previousNoGallonsDiesel: [];
}

export interface previousNoMechanicDiesel_I {
    previousNoMechanicDiesel: [];
}

export interface previousNoMoneyDiesel_I {
    previousNoMoneyDiesel: [];
}



//ok
export interface previousNoGallonsRegular_I {
    previousNoGallonsRegular: DispenserReader;
}

export interface previousNoGallonsRegularTotal_I {
    totalPreviousGallon: [];
}

export interface previousNoGallonsMechanicTotal_I {
    totalPreviousMechanic: [];
}

export interface previousNoGallonsMoneyTotal_I {
    totalPreviousMoney: [];
}


export interface previousNoGallonsSuperTotal_I {
    totalPreviousGallon: [];
}

export interface previousNoGallonsMechanicSuperTotal_I {
    totalPreviousMechanic: [];
}

export interface previousNoGallonsMoneySuperTotal_I {
    totalPreviousMoney: [];
}

export interface previousNoGallonsDieselTotal_I {
    totalPreviousGallon: [];
}

export interface previousNoGallonsMechanicDieselTotal_I {
    totalPreviousMechanic: [];
}

export interface previousNoGallonsMoneyDieselTotal_I {
    totalPreviousMoney: [];
}

export interface previousTotalNoMechanicRegular_I {
    previousTotalNoMechanicRegular: DispenserReader;
}


export interface previousTotalNoMoneyRegular_I {
    previousTotalNoMoneyRegular: DispenserReader;
}
//ok
export interface DispenserReaderSuper_I {
    previousNoGallonsSuper1: DispenserReader;
}

export interface previousTotalNoGallonRegular_I {
    previousTotalNoGallonRegular: DispenserReader;
}

export interface previousTotalNoGallonsSuper_I {
    previousTotalNoGallonsSuper: DispenserReader;
}

export interface previousTotalNoMoneySuper_I {
    previousTotalNoMoneySuper: DispenserReader;
}

export interface previousTotalNoGallonsDiesel_I {
    previousTotalNoGallonsDiesel: DispenserReader;
}

export interface previousTotalNoMechanicDiesel_I {
    previousTotalNoMechanicDiesel: DispenserReader;
}

export interface previousTotalNoMoneyDiesel_I {
    previousTotalNoMoneyDiesel: DispenserReader;
}

export interface previousTotalNoMechanicSuper_I {
    previousTotalNoMechanicSuper: DispenserReader;
}
//ok
export interface previousNoMechanicSuper1_I {
    previousNoMechanicSuper1: DispenserReader;
}
//ok
export interface previousNoMechanicRegular_I {
    previousNoMechanicRegular: DispenserReader;
}
//ok
export interface previousNoMoneySuper1_I {
    previousNoMoneySuper1: DispenserReader;
}
//ok
export interface previousNoMoneyRegular_I {
    previousNoMoneyRegular: DispenserReader;
}

//ok
export interface previousNoGallonsSuper_I {
    previousNoGallonsSuper: [];
}

//ok
export interface previousNoGallons_I {
    previousNoGallons: [];
}


//ok
export interface previousNoMechanicSuper_I {
    previousNoMechanicSuper: [];
}

//ok
export interface previousNoMoneySuper_I {
    previousNoMoneySuper: [];
}


export interface PenultimateGallons_I {
    penultimateNoGallons: [];
}
//ok
export interface previousNoMechanicR_I {
    previousNoMechanicR: [];
}

//ok
export interface previousNoMoneyR_I {
    previousNoMoneyR: [];
}

export interface previousNoGallonsDiesel1_I {
    previousNoGallonsDiesel1: DispenserReader;
}

export interface previousNoMechanicDiesel1_I {
    previousNoMechanicDiesel1: DispenserReader;
}

export interface previousNoMoneyDiesel1_I {
    previousNoMoneyDiesel1: DispenserReader;
}
//interface to General Dispenser Reader
export interface TotalGallons_I {
    noGallons: GeneralDispenserReader;
}


export interface ListNumerationDispenser_I {
    listNumerationDispenser: [];
}
export interface GeneralDispenserReader_I {
    generalDispenserReader: GeneralDispenserReader;
}

export interface TotalRegularGallons_I {
    totalRegularGallons: GeneralDispenserReader;
}

export interface TotalSuperGallons_I {
    totalSuperGallons: GeneralDispenserReader;
}

export interface TotalDieselGallons_I {
    totalDieselGallons: GeneralDispenserReader;
}

export interface countGallonsRegular_I {
    countGallonsRegular: []
}

export interface countGallonsSuper_I {
    countGallonsSuper: []
}
export interface countGallonsDiesel_I {
    countGallonsDiesel: []
}

export interface fuel_I {
    fuels: Taxes
}

export interface countTotalSaleRegular_I {
    countTotalSaleRegular: []
}
export interface countTotalSaleSuper_I {
    countTotalSaleSuper: []
}
export interface countTotalSaleDiesel_I {
    countTotalSaleDiesel: []
}

export interface getGallonsDB_I {
    totalRegularGallons : GeneralDispenserReader;
    totalMechanicRegular : GeneralDispenserReader;
    totalMoneyRegular : GeneralDispenserReader;
    totalGallonSuper : GeneralDispenserReader;
    totalMechanicSuper : GeneralDispenserReader;
    totalMoneySuper : GeneralDispenserReader;
    totalGallonDiesel : GeneralDispenserReader;
    totalMechanicDiesel : GeneralDispenserReader;
    totalMoneyDiesel: GeneralDispenserReader;
}

export interface ListLastNumerationDispenser_I {
    listNumerationDispenser: [];
    generalDispId: GeneralDispenserReader
}