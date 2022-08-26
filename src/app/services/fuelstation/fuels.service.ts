
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fuel_I } from 'src/app/interfaces/fuelstation/dispensers.interface';
import { taxesByFuel } from 'src/app/interfaces/fuelstation/fuels.interface';
import { FuelsIpd_I, Fuels_I, TaxesId_I } from 'src/app/interfaces/infrastructure.interface';
import { Fuels } from 'src/app/models/infrastructure.model';
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

 getFuelsActive(){
  return this.http.get<Fuels_I>(`${api_url}/fuels/active`, this.headers);
 };


 getIdpFuels( fuel: string) : Observable<TaxesId_I>{
  return this.http.post<TaxesId_I>(`${api_url}/fuels/idp`, fuel, this.headers);
 };

}
