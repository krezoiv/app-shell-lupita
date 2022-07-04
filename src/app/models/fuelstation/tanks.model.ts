import { Fuels } from "../infrastructure.model";
import { Status } from "../status.model";


export class FuelTanks {

    constructor(
        public tankName? : string,
        public maxStorage? : number,
        public gallonsStoraged? : number,
        public fuelId? : Fuels,
        public statusId? : Status,
        public fuelTankId? : string
    ){}
    
}