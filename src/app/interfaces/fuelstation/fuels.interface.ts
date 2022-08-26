import { Hoses } from "src/app/models/fuelstation/hoses.models";
import { Fuels } from "src/app/models/infrastructure.model";
import { Taxes } from "src/app/models/purchase/taxes.model";

export interface RegularPrice_I {
    regularPrice: Hoses;
}

export interface SuperPrice_I {
    superPrice: Hoses;
}

export interface DieselPrice_I {
    dieselPrice: Hoses;
}

export interface taxesByFuel {
    fuelName : string,
    costPrice :string,
    salePrice : string,
    statusId: string ,
    taxesId: Taxes,
}