import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LubricantInventory_I } from 'src/app/interfaces/lubricants.interface';
import { Lubricants } from 'src/app/models/infrastructure.model';
import { Observable } from 'rxjs';


const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class LubricantsInventoryService {

  constructor(
    private _http: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  };

  get headers(){
    return {
      headers: {
        'jwt-token' : this.token
      }
    };
  };


  getLubricantsInventory(){
    return this._http.get<LubricantInventory_I>(`${api_url}/lubricantsInventory`, this.headers)
  }

  createLubricant(lubricants : Lubricants): Observable<Lubricants[]> {
    return this._http.post<Lubricants[]>(`${api_url}/lubricants`, lubricants, this.headers);
  }

}
