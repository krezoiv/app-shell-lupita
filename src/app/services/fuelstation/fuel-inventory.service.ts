import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AmountPending_I, fuelDieselByCode_I, fuelIdDiesel_I, fuelIdRegular_I, fuelIdSuper_I, fuelInventoryAmountPending_I, fuelInventoryAvailable_I, FuelInventoryId_I, fuelRegularByCode_I, fuelSuperByCode_I, inventoryCode_I, InventroyData_I } from 'src/app/interfaces/fuelstation/fuelInventory.interface';
import { FuelInventory } from 'src/app/models/fuelstation/fuelInventory.model';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class FuelInventoryService {

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

  getFuelInventoryId(fuelInventoryId : string): Observable<FuelInventoryId_I>{
    return this._http.post<FuelInventoryId_I>(`${api_url}/fuelInventory/fuelInventoryId`, fuelInventoryId, this.headers);
  };
  
  getinventoryCode(inventoryCode : string): Observable<inventoryCode_I>{
    return this._http.post<inventoryCode_I>(`${api_url}/fuelInventory/inventoryCode`, inventoryCode, this.headers);
  };

  getAmountPending(amountPending : string): Observable<AmountPending_I>{
    return this._http.post<AmountPending_I>(`${api_url}/fuelInventory/fuelInventoryAmountPending`, amountPending, this.headers);
  };

 
  getFuelIdRegular(): Observable<fuelIdRegular_I>{
    return this._http.get<fuelIdRegular_I>(`${api_url}/fuelInventory/fuelIdRegular`,  this.headers);
  };

  getFuelIdSuper(): Observable<fuelIdSuper_I>{
    return this._http.get<fuelIdSuper_I>(`${api_url}/fuelInventory/fuelIdSuper`, this.headers);
  };

  getFuelIdDiesel(): Observable<fuelIdDiesel_I>{
    return this._http.get<fuelIdDiesel_I>(`${api_url}/fuelInventory/fuelIdDiesel`, this.headers);
  };

  getFuelRegularByCode(): Observable<fuelRegularByCode_I>{
    return this._http.get<fuelRegularByCode_I>(`${api_url}/fuelInventory/fuelRegularByCode`,  this.headers);
  };

  getFuelSuperByCode(): Observable<fuelSuperByCode_I>{
    return this._http.get<fuelSuperByCode_I>(`${api_url}/fuelInventory/fuelSuperByCode`, this.headers);
  };

  getFuelDieselByCode(): Observable<fuelDieselByCode_I>{
    return this._http.get<fuelDieselByCode_I>(`${api_url}/fuelInventory/fuelDieselByCode`, this.headers);
  };

  getFuelInventoryAmountPending(amountPending : number): Observable<fuelInventoryAmountPending_I>{
    return this._http.post<fuelInventoryAmountPending_I>(`${api_url}/fuelInventory/fuelInventoryAmountPending`, amountPending, this.headers);
  };

   /**
   * * get available amount from db storaged
   */
  getFuelInventoryAvailable(avilable : number): Observable<fuelInventoryAvailable_I>{
    return this._http.post<fuelInventoryAvailable_I>(`${api_url}/fuelInventory/fuelInventoryAvailable`, avilable, this.headers);
  };

  getFuelInventoryAvailableCode(avilable : number): Observable<fuelInventoryAvailable_I>{
    return this._http.post<fuelInventoryAvailable_I>(`${api_url}/fuelInventory/fuelInventoryAvailableCode`, avilable, this.headers);
  };

  updateAmountPending(fuelInventory : FuelInventory): Observable<FuelInventory[]>{
    return this._http.put<FuelInventory[]>(`${api_url}/fuelInventory/${fuelInventory.fuelInventoryId}`, fuelInventory, this.headers);
  };

  updateAvailableRegular(fuelInventory : FuelInventory): Observable<FuelInventory[]>{
    return this._http.post<FuelInventory[]>(`${api_url}/fuelInventory/updateAvailableRegular`, fuelInventory, this.headers);
  };

  updateAvailableSuper(fuelInventory : FuelInventory): Observable<FuelInventory[]>{
    return this._http.post<FuelInventory[]>(`${api_url}/fuelInventory/updateAvailableSuper`, fuelInventory, this.headers);
  };

  updateAvailableDiesel(fuelInventory : FuelInventory): Observable<FuelInventory[]>{
    return this._http.post<FuelInventory[]>(`${api_url}/fuelInventory/updateAvailableDiesel`, fuelInventory, this.headers);
  };

  updateAvailableRegularSale(fuelInventory : FuelInventory): Observable<FuelInventory[]>{
    return this._http.post<FuelInventory[]>(`${api_url}/fuelInventory/updateAvailableRegularSale`, fuelInventory, this.headers);
  };

  updateAvailableSuperSale(fuelInventory : FuelInventory): Observable<FuelInventory[]>{
    return this._http.post<FuelInventory[]>(`${api_url}/fuelInventory/updateAvailableSuperSale`, fuelInventory, this.headers);
  };

  updateAvailableDieselSale(fuelInventory : FuelInventory): Observable<FuelInventory[]>{
    return this._http.post<FuelInventory[]>(`${api_url}/fuelInventory/updateAvailableDieselSale`, fuelInventory, this.headers);
  };

  getInventoryData(){
    return this._http.get<InventroyData_I>(`${api_url}/fuelInventory`, this.headers);
  }
}
