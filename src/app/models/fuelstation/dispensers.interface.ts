import { Status } from "../status.model";
import { Island } from "./island.models";

export class Dispensers {

    constructor(
        public dispenserCode? : string,
        public islandId? : Island,
        public statusId? : Status

    ){}
}