import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { Observable } from 'rxjs';
import { lastNoDocument_I } from 'src/app/interfaces/salesControl.interface';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class SalesControlService {

  constructor(
    private http: HttpClient
  ) { }
  
  get token(): string {
    return localStorage.getItem('token') || '';
  }; 

  get headers() {
    return {
      headers: {
        'jwt-token': this.token
      }
    };
  };


  createSalesControl(salesControl : SalesControl) : Observable<SalesControl[]>{
    return this.http.post<SalesControl[]>(`${api_url}/salesControl`, salesControl, this.headers);
  };

  getLastNoDocumentSale(): Observable<lastNoDocument_I> {
    return this.http.get<lastNoDocument_I>(`${api_url}/salesControl/noDocumentSales`, this.headers);
  }
}
