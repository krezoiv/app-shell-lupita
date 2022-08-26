import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store_I } from 'src/app/interfaces/fuelstation/persons.interface';
import { environment } from 'src/environments/environment';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class StoreService {

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

getStores(){
  return this._http.get<Store_I>(`${api_url}/store`, this.headers);
}

};
