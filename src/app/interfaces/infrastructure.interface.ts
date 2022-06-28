

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

export interface Fuels {
    fuels:[],
}

export interface updatePriceFuel_I{
    costPrice : number,
    salePrice : number,
}