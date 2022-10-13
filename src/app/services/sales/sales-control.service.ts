import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { Observable } from 'rxjs';
import {DeleteSalesControl_I, lastNoDocument_I, lastSaleControl_I, SalebyDocument_I } from 'src/app/interfaces/salesControl.interface';
import { DeleteSalesControlComponent } from 'src/app/pages/cuadres/delete-sales-control/delete-sales-control.component';

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
  };

  getSaleByNoDocument(formData : SalesControl): Observable<SalebyDocument_I>{
    return this.http.post<SalebyDocument_I>(`${api_url}/salesControl/saleByNoDocument`, formData, this.headers);
  };

  lastSaleControl(): Observable<lastSaleControl_I>{
    return this.http.get<lastSaleControl_I>(`${api_url}/salesControl/lastSaleControl`, this.headers);
  }

  deleteSalesControl(formData : SalesControl): Observable<DeleteSalesControl_I>{
    return this.http.post<DeleteSalesControl_I>(`${api_url}/generalDispenserReader/deleteSale`,formData, this.headers);
  }
}
