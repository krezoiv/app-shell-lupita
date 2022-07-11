import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dispensers_I } from 'src/app/interfaces/fuelstation/dispensers.interface';
import { Assignment, AssignmentHose } from 'src/app/models/fuelstation/assignment.model';
import { Dispensers } from 'src/app/models/fuelstation/dispensers.model';
import { environment } from 'src/environments/environment';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class DispensersService {

  constructor(
    private http : HttpClient
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

  getDIspensers() : Observable<Dispensers_I>{
    return this.http.get<Dispensers_I>(`${api_url}/dispensers`, this.headers);
  }

  createDispenser(dispenser : Dispensers) : Observable<Dispensers[]>{
    return this.http.post<Dispensers[]>(`${api_url}/dispensers`, dispenser, this.headers);
  }


  deleteDispenser(dispenser: Dispensers): Observable<Dispensers[]>{
    return this.http.put<Dispensers[]>(`${api_url}/dispensers/delete/${dispenser.dispenserId}`,dispenser, this.headers);
  }

  updateDispenser(dispenser : Dispensers): Observable<Dispensers[]>{
    return this.http.put<Dispensers[]>(`${api_url}/dispensers/${dispenser.dispenserId}`,dispenser, this.headers);
  }


  createAssignment(assignment : Assignment) : Observable<Assignment[]>{
    return this.http.post<Assignment[]>(`${api_url}/assignment`, assignment, this.headers);
  }

  getIdAssignment(assignment : Assignment) : Observable<Assignment[]>{
    return this.http.get<Assignment[]>(`${api_url}/assignment`, this.headers);
  }

  creatAssignmentHose(assignmentHose : AssignmentHose): Observable<Assignment[]>{
    return this.http.post<Assignment[]>(`${api_url}/assignmentHose`,assignmentHose, this.headers);
  }

  
}
