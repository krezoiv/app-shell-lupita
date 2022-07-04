import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  return this.http.get<Hoses_I>(`${api_url}/hoses/actve`, this.headers);
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



};
