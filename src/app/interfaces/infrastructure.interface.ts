

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
    fuels:[],
}

export interface updatePriceFuel_I{
    fuelId : string,
    costPrice : number,
    salePrice : number,
}