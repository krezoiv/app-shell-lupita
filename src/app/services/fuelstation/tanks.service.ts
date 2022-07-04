import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tanks_I } from 'src/app/interfaces/fuelstation/tanks.interface';
import { FuelTanks } from 'src/app/models/fuelstation/tanks.model';
import { environment } from 'src/environments/environment';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class TanksService {

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

  getTanks(){
    return this.http.get<Tanks_I>(`${api_url}/fuelTanks`, this.headers);
  };

  createTank(fuelTank : FuelTanks): Observable<FuelTanks[]>{
    return this.http.post<FuelTanks[]>(`${api_url}/fuelTanks`, fuelTank, this.headers);
  };

  updateTank(fuelTank : FuelTanks): Observable<FuelTanks[]>{
    return this.http.put<FuelTanks[]>(`${api_url}/fuelTanks/${fuelTank.fuelTankId}`,fuelTank, this.headers);
  }

  deleteTank(fuelTank : FuelTanks): Observable<FuelTanks[]>{
    return this.http.put<FuelTanks[]>(`${api_url}/fuelTanks/delete/${fuelTank.fuelTankId}`,fuelTank, this.headers);
  };


}

