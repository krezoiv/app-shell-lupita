import { Status } from "../status.model";

export class Island {

    constructor(

        public islandNumber? : number,
        public statusId? : Status,
        public islandId? : string
    ){}
}