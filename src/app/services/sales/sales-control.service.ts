import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { Observable } from 'rxjs';
import { countTotalSale_I, lastNoDocument_I, SalebyDocument_I, SalesByDate_I } from 'src/app/interfaces/salesControl.interface';

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

  getSalesByDates(from : number = 0): Observable<SalesByDate_I>{
    return this.http.post<SalesByDate_I>(`${api_url}/salesControl/salesByDate`, from, this.headers);
  }

  getAllSales(from : number = 0): Observable<SalesByDate_I>{
    return this.http.get<SalesByDate_I>(`${api_url}/salesControl?from=${from}`, this.headers);
  };

  getTotalSalesByDate(formData : SalesControl): Observable<countTotalSale_I>{
    return this.http.post<countTotalSale_I>(`${api_url}/salesControl/countSumSalesByDate`, formData, this.headers);
  };
}
