
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class FuelsService {

  constructor(
    private http : HttpClient
  ) { }

  get token() : string{
    return localStorage.getItem('token')|| '';
  }

  get headers(){
    return {
      headers : {
        'jwt-token' : this.token
      }
    };
  };

 
}
