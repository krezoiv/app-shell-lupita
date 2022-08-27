import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ListPurchaseDetailOrder_I, PurchaseOrder_I } from 'src/app/interfaces/fuelstation/purchase.interface';
import { DispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { DetailPurchaseOrder, PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
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

  createDetailOrder(formData : DetailPurchaseOrder): Observable<DetailPurchaseOrder>{
    return this._http.post<DetailPurchaseOrder>(`${api_url}/detailPurchaseOrder`, formData, this.headers)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  getPurchaseOrderId(purchaseOrderId : string): Observable<PurchaseOrder_I>{
    return this._http.post<PurchaseOrder_I>(`${api_url}/purchaseOrders/PurchaseOrderId`, purchaseOrderId, this.headers);
  }

  getListPurchaseDetailOrder(formData : DispenserReader): Observable<ListPurchaseDetailOrder_I>{
    return this._http.post<ListPurchaseDetailOrder_I>(`${api_url}/detailPurchaseOrder/listPurchaseDetail`, formData, this.headers);
  }

}
