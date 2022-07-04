import { Status } from "../status.model";


export class Island {

    constructor(

        public islandNumber? : string,
        public statusId? : Status,
        public islandId? : string
    ){}
}