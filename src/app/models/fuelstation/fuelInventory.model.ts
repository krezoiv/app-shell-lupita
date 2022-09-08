import { Fuels } from "../infrastructure.model";
import { FuelTanks } from "./tanks.model";

export class FuelInventory {

    constructor(
        public fuelInventoryId : string,
        public inventoryCode : string, 
        public fuelTankId : FuelTanks,
        public fuelId : Fuels,
        public available : number,
        public amountPending : number
       
    ) { }
}
