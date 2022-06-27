import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginform.interface';




const api_url = environment.api_url;
//const api = `http://localhost:3000/api/login`

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor
  (
    private http: HttpClient,
    private router : Router
  ) { }

  validateToken(): Observable<boolean>{  
    
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${api_url}/login/renew`, {
      headers: {
        'jwt-token' : token
      }
    }).pipe(tap((data: any) => {
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
                    localStorage.setItem('token', data.token)
                  })
                );
  };

  logOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  };

};

