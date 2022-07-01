import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Island_I } from 'src/app/interfaces/fuelstation/island.interface';
import { Island } from 'src/app/models/fuelstation/island.models';
import { Observable } from 'rxjs';

const api_url = environment.api_url;


@Injectable({
  providedIn: 'root'
})
export class IslandsService {

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

getIslands(){
  return this.http.get<Island_I>(`${api_url}/islands`, this.headers);
}

createIsland(island: Island): Observable<Island[]>{
  return this.http.post<Island[]>(`${api_url}/islands`, island, this.headers);
}

updateIsland(island: Island): Observable<Island[]>{
  return this.http.put<Island[]>(`${api_url}/islands/${island.islandId}`,island, this.headers);
}

deleteIsland(island: Island): Observable<Island[]>{
  return this.http.put<Island[]>(`${api_url}/islands/delete/${island.islandId}`,island, this.headers);
}

}
