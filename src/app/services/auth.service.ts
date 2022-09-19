import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginform.interface';
import { LoggedUser_I, User } from '../interfaces/users.interface';
import { Users } from '../models/user.models';


const api_url = environment.api_url;
//const api = `http://localhost:3000/api/login`

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public usuario! : Users;
  constructor
  (
    private http: HttpClient,
    private router : Router
  ) { }


  get role() {
    return this.usuario.role
  }
  
  validateToken(): Observable<boolean>{  
    
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${api_url}/login/renew`, {
      headers: {
        'jwt-token' : token
      }
    }).pipe(tap((data: any) => {
      const {firstName, lastName, email, statusId, role, userId} = data.usuario;
      this.usuario = new Users(firstName, lastName, email, statusId, role, userId);
     
      localStorage.setItem('token', data.token);
    }),map(data => true),
    catchError(error =>of(false))
    );
  }

  login( formData : LoginForm){
    return this.http.post(`${api_url}/login`, formData)
    //pipe para obtener el token y guardarlos en el localstorage
                .pipe(
                  tap((data:any) => {
                    localStorage.setItem('token', data.token, )
                  })
                );
  };

  logOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  };


  userLooged( formData : LoginForm): Observable<LoggedUser_I>{
    return this.http.post<LoggedUser_I>(`${api_url}/login/loggedUser`, formData)
  }
};

