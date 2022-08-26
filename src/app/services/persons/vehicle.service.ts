import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle_I } from 'src/app/interfaces/fuelstation/persons.interface';
import { environment } from 'src/environments/environment';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    private _http : HttpClient
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

getVehicle(){
  return this._http.get<Vehicle_I>(`${api_url}/vehicles`, this.headers);
}

}
