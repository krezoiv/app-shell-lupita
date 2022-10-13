import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { countTotalSale_I, greaterDieselGallons_I, greaterRegularGallons_I, greaterSale_I, greaterSuperGallons_I, lesserDieselGallons_I, lesserRegularGallons_I, lesserSale_I, lesserSuperGallons_I, SalesByDate_I, totalSales_I } from 'src/app/interfaces/salesControl.interface';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { GeneralDispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { countTotalSaleDiesel_I, countTotalSaleRegular_I, countTotalSaleSuper_I } from 'src/app/interfaces/fuelstation/dispensers.interface';

const api_url = environment.api_url;
@Injectable({
  providedIn: 'root'
})
export class SalesReportingService {

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

  getTotalSales(): Observable<totalSales_I>{
    return this.http.get<totalSales_I>(`${api_url}/salesControl/countSales`, this.headers);
  };

  getSalesByDates(from : number = 0): Observable<SalesByDate_I>{
    return this.http.post<SalesByDate_I>(`${api_url}/salesControl/salesByDate`, from, this.headers);
  };

  getTotalSalesByDate(formData : SalesControl): Observable<countTotalSale_I>{
    return this.http.post<countTotalSale_I>(`${api_url}/salesControl/countSumSalesByDate`, formData, this.headers);
  };
  

  getCountSumGallonsRegular(formData : GeneralDispenserReader): Observable<countTotalSaleRegular_I>{
    return this.http.post<countTotalSaleRegular_I>(`${api_url}/generalDispenserReader/countSumRegularGallonsSalesByDate`, formData, this.headers);
  };


  getCountSumGallonsSuper(formData : GeneralDispenserReader): Observable<countTotalSaleSuper_I>{
    return this.http.post<countTotalSaleSuper_I>(`${api_url}/generalDispenserReader/countSumSuperGallonsSalesByDate`, formData, this.headers);
  };

  getCountSumGallonsDiesel(formData : GeneralDispenserReader): Observable<countTotalSaleDiesel_I>{
    return this.http.post<countTotalSaleDiesel_I>(`${api_url}/generalDispenserReader/countSumDieselGallonsSalesByDate`, formData, this.headers);
  };

  getAllSales(from : number = 0): Observable<SalesByDate_I>{
    return this.http.get<SalesByDate_I>(`${api_url}/salesControl?from=${from}`, this.headers);
  };

  getGreaterTotalSaleByDate(formData : SalesControl): Observable<greaterSale_I>{
    return this.http.post<greaterSale_I>(`${api_url}/salesControl/greaterSaleByDate`, formData, this.headers);
  };

  getLesserTotalSaleByDate(formData : SalesControl): Observable<lesserSale_I>{
    return this.http.post<lesserSale_I>(`${api_url}/salesControl/lessserSaleByDate`, formData, this.headers);
  };

  getGreaterRegularGallonsByDate(formData : SalesControl): Observable<greaterRegularGallons_I>{
    return this.http.post<greaterRegularGallons_I>(`${api_url}/salesControl/greaterRegularGallon`, formData, this.headers);
  };

  getLesserRegularGallonsByDate(formData : SalesControl): Observable<lesserRegularGallons_I>{
    return this.http.post<lesserRegularGallons_I>(`${api_url}/salesControl/lesserRegularGallon`, formData, this.headers);
  };

  getGreaterSuperGallonsByDate(formData : SalesControl): Observable<greaterSuperGallons_I>{
    return this.http.post<greaterSuperGallons_I>(`${api_url}/salesControl/greaterSuperGallon`, formData, this.headers);
  };

  getLesserSuperGallonsByDate(formData : SalesControl): Observable<lesserSuperGallons_I>{
    return this.http.post<lesserSuperGallons_I>(`${api_url}/salesControl/lesserSuperGallon`, formData, this.headers);
  };
  
  getGreaterDieselGallonsByDate(formData : SalesControl): Observable<greaterDieselGallons_I>{
    return this.http.post<greaterDieselGallons_I>(`${api_url}/salesControl/greaterDieselGallon`, formData, this.headers);
  };

  getLesserDieselGallonsByDate(formData : SalesControl): Observable<lesserDieselGallons_I>{
    return this.http.post<lesserDieselGallons_I>(`${api_url}/salesControl/lesserDieselGallon`, formData, this.headers);
  };
  
 
}


