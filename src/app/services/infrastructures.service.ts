import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { deleteFuel_I, Fuels_I, getFuels, newFuel, updatePriceFuel_I } from '../interfaces/infrastructure.interface';
import { Fuels } from '../models/infrastructure.model';
//import { Fuelss } from '../models/infrastructure.model';



const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class InfrastructuresService {

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

  getFuels() {
    return this.http.get<Fuels_I>(`${api_url}/fuels`, this.headers);

  };

  getFuelsActive() {
    return this.http.get<Fuels_I>(`${api_url}/fuels/active`, this.headers);

  }

  createFuel(fuel: Fuels_I)
    : Observable<newFuel[]> {
    return this.http.post<newFuel[]>(`${api_url}/fuels`, fuel, this.headers);

  }

  updatePriceFuel(fuel: Fuels): Observable<Fuels[]> {
    return this.http.put<Fuels[]>(`${api_url}/fuels/updatePrices/${fuel.fuelId}`, fuel, this.headers);

  }

  deleteFuel(fuel: Fuels): Observable<Fuels[]> {
    return this.http.put<Fuels[]>(`${api_url}/fuels/delete/${fuel.fuelId}`, fuel, this.headers);


  }

  updateFuel(fuel: Fuels): Observable<Fuels[]> {
    return this.http.put<Fuels[]>(`${api_url}/fuels/${fuel.fuelId}`, fuel, this.headers);
  }



}
