import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dispensers } from 'src/app/models/fuelstation/dispensers.interface';
import { environment } from 'src/environments/environment';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class DispensersService {

  constructor(
    private http : HttpClient
  ) { }

  get token(): string{
    return localStorage.getItem('token')|| '';
  }
  
  get headers() {
    return {
      headers: {
        'jwt-token' : this.token
      }
    };
  }; 

  createDispenser(dispenser : Dispensers) : Observable<Dispensers[]>{
    return this.http.post<Dispensers[]>(`${api_url}/dispensers`, dispenser, this.headers);
  }
}
