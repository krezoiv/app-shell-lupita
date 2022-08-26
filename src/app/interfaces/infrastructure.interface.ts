import { Fuels } from "../models/infrastructure.model";
import { Taxes } from "../models/purchase/taxes.model";


export interface getFuels {
    fuels:[];
    status:[];
}

export interface newFuel {

    fuelName : string,
    costPrice : number,
    salePrice : number,
    statusId : string,
}

export interface Fuels_I {
    fuels: [],
}

export interface TaxesId_I{
  fuels : Fuels
}

export interface updatePriceFuel_I{
    fuelId : string,
    costPrice : number,
    salePrice : number,
}

export interface deleteFuel_I {
    fuelId : string
}

export interface FuelsIpd_I {
    fuels: Fuels,
}