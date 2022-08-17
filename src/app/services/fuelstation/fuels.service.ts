
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuelPrice_I } from 'src/app/interfaces/fuelstation/fuels.interface';
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

  getFuelPrices(){
    return this.http.get<FuelPrice_I>(`${api_url}/fuels`, this.headers);
  }
}
