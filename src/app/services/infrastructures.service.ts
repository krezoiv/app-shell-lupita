import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fuels, getFuels, newFuel, updatePriceFuel_I } from '../interfaces/infrastructure.interface';



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

  getFuels()  {
           return this.http.get<Fuels>(`${api_url}/fuels`, this.headers);

  }

  createFuel(fuel : Fuels) 
        : Observable<newFuel[]>{
            return this.http.post<newFuel[]>(`${api_url}/fuels`, fuel, this.headers);

  }

 
}
