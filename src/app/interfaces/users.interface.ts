import { Users } from "../models/user.models";


export interface getUsers {
    users: [];
    roles: [];

};

export interface Roles_I {

    roleId: string
    roleName: string

}


export interface User {
    users: [];
}

export interface newUser {
    
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roleId: string,
    statusId: string,
}

export interface LoggedUser_I {
    userDB: Users
}


export interface Banks_I {
    bankId : string,
    bankName : string

}

export interface UserByName_I {
    users : Users
}

export interface Applied_I {
    appliedId : string,
    appliedName : string

}