import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DieselPrice_I,  FuelId_I,  HoseId_I,  RegularPrice_I, SuperPrice_I } from 'src/app/interfaces/fuelstation/fuels.interface';
import { Hoses_I } from 'src/app/interfaces/fuelstation/hoses.interfaces';
import { Hoses } from 'src/app/models/fuelstation/hoses.models';
import { environment } from 'src/environments/environment';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class HosesService {

  constructor(
    private http: HttpClient
  ) { }

  
get token(): string{
  return localStorage.getItem('token')|| '';
}

get headers() {
  return {
    headers: {
      'jwt-token' : this.token
    }
  };
};

getHoses(){
  return this.http.get<Hoses_I>(`${api_url}/hoses`, this.headers);
};

getHosesActive(){
  return this.http.get<Hoses_I>(`${api_url}/hoses/active`, this.headers);
};


createHose(hose: Hoses): Observable<Hoses[]>{
  return this.http.post<Hoses[]>(`${api_url}/hoses`, hose, this.headers);
};


updateHose(hose: Hoses): Observable<Hoses[]>{
  return this.http.put<Hoses[]>(`${api_url}/hoses/${hose.hoseId}`,hose, this.headers);
};

deleteHose(hose: Hoses): Observable<Hoses[]>{
  return this.http.put<Hoses[]>(`${api_url}/hoses/delete/${hose.hoseId}`,hose, this.headers);
};

getRegularPrices(): Observable<RegularPrice_I>{
  return this.http.get<RegularPrice_I>(`${api_url}/hoses/regularprice`, this.headers);
};

getSuperPrices(): Observable<SuperPrice_I>{
  return this.http.get<SuperPrice_I>(`${api_url}/hoses/superprice`, this.headers);
};

getDieselPrices(): Observable<DieselPrice_I>{
  return this.http.get<DieselPrice_I>(`${api_url}/hoses/dieselprice`, this.headers);
};

getHoseIdByAssignmentId(hoseId : string): Observable<HoseId_I>{
  return this.http.post<HoseId_I>(`${api_url}/hoses/hoseId`, hoseId, this.headers);
}

getFuelIdByHoseId(fuelId: string): Observable<FuelId_I>{
  return this.http.post<FuelId_I>(`${api_url}/hoses/fuelId`, fuelId, this.headers);
}
};
