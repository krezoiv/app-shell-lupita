import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { countTotalPurchaseDiesel_I, countTotalPurchaseRegular_I, countTotalPurchaseSuper_I, countTotalPurchase_I, GreatePurchase_I, GreaterDieselPurchase_I, GreaterRegularPurchase_I, GreaterSuperPurchase_I, LesserDieselPurchase_I, LesserPurchase_I, LesserRegularPurchase_I, LesserSuperPurchase_I, PurchaseByDate_I } from 'src/app/interfaces/purchase.interface';
import { Purchase, PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
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
  };

  getTotalPurchaseByDate(formData : Purchase): Observable<countTotalPurchase_I>{
    return this._http.post<countTotalPurchase_I>(`${api_url}/purchases/countSumPurchaseByDate`, formData, this.headers);
  };

 
  getCountSumGallonsRegularPurchase(formData : PurchaseOrder): Observable<countTotalPurchaseRegular_I>{
    return this._http.post<countTotalPurchaseRegular_I>(`${api_url}/purchases/totalGallonsRegularByDates`, formData, this.headers);
  };


  getCountSumGallonsSuperPurchase(formData : PurchaseOrder): Observable<countTotalPurchaseSuper_I>{
    return this._http.post<countTotalPurchaseSuper_I>(`${api_url}/purchases/totalGallonsSuperByDates`, formData, this.headers);
  };

  getCountSumGallonsDieselPurchase(formData : PurchaseOrder): Observable<countTotalPurchaseDiesel_I>{
    return this._http.post<countTotalPurchaseDiesel_I>(`${api_url}/purchases/totalGallonsDieselByDates`, formData, this.headers);
  };

  getGreaterTotalPurchaseByDate(formData : Purchase): Observable<GreatePurchase_I>{
    return this._http.post<GreatePurchase_I>(`${api_url}/purchases/greaterPurchase`, formData, this.headers);
  };

  getLesserTotalPurchaseByDate(formData : Purchase): Observable<LesserPurchase_I>{
    return this._http.post<LesserPurchase_I>(`${api_url}/purchases/lesserPurchase`, formData, this.headers);
  };


  getGreaterRegularPurchaseByDate(formData : PurchaseOrder): Observable<GreaterRegularPurchase_I>{
    return this._http.post<GreaterRegularPurchase_I>(`${api_url}/purchasesgreaterPurchaseRegular`, formData, this.headers);
  };

  getLesserRegularPurchaseByDate(formData : PurchaseOrder): Observable<LesserRegularPurchase_I>{
    return this._http.post<LesserRegularPurchase_I>(`${api_url}/purchases/lesserPurchaseRegular`, formData, this.headers);
  };

  getGreaterSuperPurchaseByDate(formData : PurchaseOrder): Observable<GreaterSuperPurchase_I>{
    return this._http.post<GreaterSuperPurchase_I>(`${api_url}/purchases/greaterPurchaseSuper`, formData, this.headers);
  };

  getLesserSuperPurchaseByDate(formData : PurchaseOrder): Observable<LesserSuperPurchase_I>{
    return this._http.post<LesserSuperPurchase_I>(`${api_url}/purchases/lesserPurchaseSuper`, formData, this.headers);
  };

  getGreaterDieselPurchaseByDate(formData : PurchaseOrder): Observable<GreaterDieselPurchase_I>{
    return this._http.post<GreaterDieselPurchase_I>(`${api_url}/purchases/greaterPurchaseDiesel`, formData, this.headers);
  };

  getLesserDieselPurchaseByDate(formData : PurchaseOrder): Observable<LesserDieselPurchase_I>{
    return this._http.post<LesserDieselPurchase_I>(`${api_url}/purchases/lesserPurchaseDiesel`, formData, this.headers);
  };

}
