import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { environment } from 'src/environments/environment';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private _refresh$ = new Subject<void>();
  private _refreshDetail$ = new Subject<void>();
  constructor(
    private _http: HttpClient
  ) { }

  get refresh$(){
    return this._refresh$
  };

  get refreshDetail$(){
    return this._refreshDetail$
  };

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

  createPurchaseOrder(formData : PurchaseOrder): Observable<PurchaseOrder>{
    return this._http.post<PurchaseOrder>(`${api_url}/purchaseOrders`, formData, this.headers)
    .pipe(
      tap(() => {
        this._refreshDetail$.next();
      })
    );
  }
}
