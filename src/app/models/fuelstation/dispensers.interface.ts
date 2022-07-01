import { Status } from "../status.model";
import { Island } from "./island.models";

export class Dispensers {

    constructor(
        public dispenserCode? : number,
        public islandId? : Island,
        public statusId? : Status

    ){}
}