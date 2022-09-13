import { Users } from "../models/user.models";


export interface getUsers {
    users: [];
    roles: [];

};

export interface Roles {

    roles: [];

}


export interface User {
    users: [];
}

export interface newUser {
    
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    rolesId: string,
    statusId: string,
}

export interface LoggedUser_I {
    userDB: Users
}



