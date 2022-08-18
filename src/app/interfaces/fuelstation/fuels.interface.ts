import { Hoses } from "src/app/models/fuelstation/hoses.models";
import { Fuels } from "src/app/models/infrastructure.model";

export interface RegularPrice_I {
    regularPrice: Hoses;
}

export interface SuperPrice_I {
    superPrice: Hoses;
}

export interface DieselPrice_I {
    dieselPrice: Hoses;
}