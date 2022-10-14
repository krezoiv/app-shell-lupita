import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { status } from '../interfaces/status.interface';
import {  Roles_I, User, UserByName_I } from '../interfaces/users.interface';
import { Users } from '../models/user.models';



const api_url = environment.api_url;


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(
    private http: HttpClient
  ) { }


  get token(): string {
    return localStorage.getItem('token') || '';

  }

  get headers() {
    return {
      headers: {
        'jwt-token': this.token
      }

    }
  }

  getUsers(){
    return this.http.get<User>(`${api_url}/users`, this.headers);

  }


  getRoles(): Observable<Roles_I> {
    return this.http.get<Roles_I>(`${api_url}/roles`);
  }

  getStatus(): Observable<status> {
    return this.http.get<status>(`${api_url}/status`);

  }

createUser(user : Users){
  return this.http.post(`${api_url}/users`, user, this.headers);
}

deleteUser(){
  return this.http.put(`${api_url}/users`, this.headers);
}

updatePassword(dataForm : Users){
  return this.http.post(`${api_url}/users/updatePass`, dataForm, this.headers);
}

getUserByName(formData : Users): Observable<UserByName_I>{
  return this.http.post<UserByName_I>(`${api_url}/users/getUserByName`, formData, this.headers);
}

}
