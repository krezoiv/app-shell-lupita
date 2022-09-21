import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseByDate_I } from 'src/app/interfaces/purchase.interface';
import { Purchase } from 'src/app/models/purchase/purchaseOrder.model';
import { environment } from 'src/environments/environment';


const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class PurchasesReportingService {

  constructor(
    private _http: HttpClient
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


  getPurchasesByDates(from: number = 0): Observable<PurchaseByDate_I>{
    return this._http.post<PurchaseByDate_I>(`${api_url}/purchases/purchasesBYDates`, from, this.headers);
  }
}
