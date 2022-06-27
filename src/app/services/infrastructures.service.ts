import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getFuels, newFuel } from '../interfaces/infrastructure.interface';

import { Fuels } from '../models/infrastructure.model';

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

  getFuels() : Observable<getFuels> {
             return this.http.get<getFuels>(`${api_url}/fuels`, this.headers);

  }

  createFuel(fuel : Fuels) 
        : Observable<newFuel[]>{
            return this.http.post<newFuel[]>(`${api_url}/fuels`, fuel, this.headers);

  }
}
