import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { status } from '../../interfaces/status.interface';


const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';

  }

  get headers() {
    return {
      headers: {
        'jwt-token': this.token
      }

    }
  }

  getStatus(): Observable<status> {
    return this.http.get<status>(`${api_url}/status`);

  }

}
