import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dispensers_I } from 'src/app/interfaces/fuelstation/dispensers.interface';
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

  getDIspensers() : Observable<Dispensers_I>{
    return this.http.get<Dispensers_I>(`${api_url}/dispensers`, this.headers);
  }

  createDispenser(dispenser : Dispensers) : Observable<Dispensers[]>{
    return this.http.post<Dispensers[]>(`${api_url}/dispensers`, dispenser, this.headers);
  }
}
