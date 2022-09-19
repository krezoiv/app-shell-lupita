
import { Status } from "./status.model";


export class Users {

    constructor(
       
        public firstName : string,
        public lastName : string,
        public email : string,
        public password : string,
        public role : 'SUPER_ROLE' | 'ADMIN_ROLE' | 'USER_ROLE' | 'GUEST_ROLE',
        public statusId : Status,
        public userId? : string,
        

    ){}
    imprimirUsuario(){
        console.log(this.role)
    }
}

export class Roles {

    constructor(
        public rolesId : string,
        public roleName : string
    ){}

}