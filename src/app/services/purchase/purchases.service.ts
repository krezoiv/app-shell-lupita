import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AmountFuelDiesel_I, AmountFuelRegular_I, AmountFuelSuper_I, AmountFuel_I, detailPurchaseOderInfo_I, infoPurchaseOrder_I, ListPurchaseDetailOrder_I, PurchaseId_I, PurchaseOrder_I, totalDetailIDPPurchaseOrder_I, totalPurchase_I } from 'src/app/interfaces/purchase.interface';
import { PaymentMethods_I } from 'src/app/interfaces/paymentMethods.interface';
import { DispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { PaymentMethods } from 'src/app/models/purchase/paymentMethods.models';
import { DetailPurchaseOrder, Purchase, PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
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
  };

  createDetailOrder(formData : DetailPurchaseOrder): Observable<DetailPurchaseOrder>{
    return this._http.post<DetailPurchaseOrder>(`${api_url}/detailPurchaseOrder`, formData, this.headers)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  };

  createPurchase(formData: Purchase): Observable<Purchase>{
    return this._http.post<Purchase>(`${api_url}/purchases`, formData, this.headers)
  }

  getPurchaseOrderId(purchaseOrderId : string): Observable<PurchaseOrder_I>{
    return this._http.post<PurchaseOrder_I>(`${api_url}/purchaseOrders/PurchaseOrderId`, purchaseOrderId, this.headers);
  };

  getPurchaseId(purchaseId : string): Observable<PurchaseId_I>{
    return this._http.post<PurchaseId_I>(`${api_url}/purchases/idPurchase`, purchaseId, this.headers);
  }

  /**
   * *service that brings the amount of fuel of the order
   * *servicio que trae la cantidad de combustible de la orden
   */
  getAmountfuel(formData : DetailPurchaseOrder) : Observable<AmountFuel_I>{
    return this._http.post<AmountFuel_I>(`${api_url}/detailPurchaseOrder/amountFuel`, formData, this.headers);
  };



  getAmountfuelRegular(formData : DetailPurchaseOrder) : Observable<AmountFuelRegular_I>{
    return this._http.post<AmountFuelRegular_I>(`${api_url}/detailPurchaseOrder/amountFuelRegular`, formData, this.headers);
  };
  getAmountfuelSuper(formData : DetailPurchaseOrder) : Observable<AmountFuelSuper_I>{
    return this._http.post<AmountFuelSuper_I>(`${api_url}/detailPurchaseOrder/amountFuelSuper`, formData, this.headers);
  };

  getAmountfuelDiesel(formData : DetailPurchaseOrder) : Observable<AmountFuelDiesel_I>{
    return this._http.post<AmountFuelDiesel_I>(`${api_url}/detailPurchaseOrder/amountFuelDiesel`, formData, this.headers);
  };


  getListPurchaseDetailOrder(formData : DispenserReader): Observable<ListPurchaseDetailOrder_I>{
    return this._http.post<ListPurchaseDetailOrder_I>(`${api_url}/detailPurchaseOrder/listPurchaseDetail`, formData, this.headers);
  };

  getTotalPurchase(): Observable<totalPurchase_I>{
    return this._http.get<totalPurchase_I>(`${api_url}/detailPurchaseOrder/totalDetailPurchase`, this.headers);
  };

  getTotalIDPPurchase(): Observable<totalDetailIDPPurchaseOrder_I>{
    return this._http.get<totalDetailIDPPurchaseOrder_I>(`${api_url}/detailPurchaseOrder/totalIDPDetailPurchase`, this.headers);
  };

  uptdateAplicarDetailOrder(): Observable<DetailPurchaseOrder>{
    return this._http.get<DetailPurchaseOrder>(`${api_url}/detailPurchaseOrder/aplicarDetailOrder`, this.headers);
  };

  updateIdPurchase(purchaseId : PurchaseOrder): Observable<PurchaseOrder>{
    return this._http.put<PurchaseOrder>(`${api_url}/purchaseOrders/idPurchase/${purchaseId.purchaseOrderId}`, this.headers);
  };

  updateTotalPurchaseOrder(purchaseOrder : PurchaseOrder) : Observable<PurchaseOrder>{
    return this._http.put<PurchaseOrder>(`${api_url}/purchaseOrders/${purchaseOrder.purchaseOrderId}`, purchaseOrder, this.headers);
  };

  getTotalPurchaseOrder(purchaseOrder : PurchaseOrder) :Observable<PurchaseOrder>{
    return this._http.post<PurchaseOrder>(`${api_url}/purchaseOrders/totalPurchase`, purchaseOrder, this.headers);
  };

  getInfoPurchaseOrder(formData : PurchaseOrder):Observable<infoPurchaseOrder_I>{
    return this._http.post<infoPurchaseOrder_I>(`${api_url}/purchaseOrders/PurchaseOrder`, formData, this.headers);
  };

  getPaymentMethods(): Observable<PaymentMethods_I>{
    return this._http.get<PaymentMethods_I>(`${api_url}/paymentMethods`, this.headers);
  }

  getDetailPurchaseOrder(formData: DetailPurchaseOrder): Observable<detailPurchaseOderInfo_I>{
    return this._http.post<detailPurchaseOderInfo_I>(`${api_url}/detailPurchaseOrder/detailPurchaseOderInfo`, formData, this.headers);
  } 
};
