import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AssignmentHose_I, AssignmentHose_In, Assignment_I, As_I, Dispensers_I, GeneralDispenserReader_I, PreviousGallons_I, PreviousMechanic_I, PreviousMoney_I, SideA_I, SideB_I } from 'src/app/interfaces/fuelstation/dispensers.interface';
import { Assignment, AssignmentHose } from 'src/app/models/fuelstation/assignment.model';
import { DispenserReader, Dispensers, GeneralDispenserReader, SideDispenser } from 'src/app/models/fuelstation/dispensers.model';
import { environment } from 'src/environments/environment';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class DispensersService {

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
    };
  };

  getDIspensers(): Observable<Dispensers_I> {
    return this.http.get<Dispensers_I>(`${api_url}/dispensers`, this.headers);
  }

 

  getAssignmentHoseId(formData: As_I): Observable<As_I> {
    return this.http.post<As_I>(`${api_url}/assignmentHose/assignmentHoseId`, formData, this.headers)

  }

  getSideA(): Observable<SideA_I> {
    return this.http.get<SideA_I>(`${api_url}/sideDispenser/sideA`, this.headers);
  }

  getSideB(): Observable<SideB_I> {
    return this.http.get<SideB_I>(`${api_url}/sideDispenser/sideB`, this.headers);
  }

  createDispenser(dispenser: Dispensers): Observable<Dispensers[]> {
    return this.http.post<Dispensers[]>(`${api_url}/dispensers`, dispenser, this.headers);
  }


  deleteDispenser(dispenser: Dispensers): Observable<Dispensers[]> {
    return this.http.put<Dispensers[]>(`${api_url}/dispensers/delete/${dispenser.dispenserId}`, dispenser, this.headers);
  }

  updateDispenser(dispenser: Dispensers): Observable<Dispensers[]> {
    return this.http.put<Dispensers[]>(`${api_url}/dispensers/${dispenser.dispenserId}`, dispenser, this.headers);
  }


  createAssignment(assignment: Assignment): Observable<Assignment[]> {
    return this.http.post<Assignment[]>(`${api_url}/assignment`, assignment, this.headers);
  }

  getIdAssignment(assignment: Assignment): Observable<Assignment[]> {
    return this.http.post<Assignment[]>(`${api_url}/assignment`, assignment, this.headers);
  }

  creatAssignmentHose(assignmentHose: AssignmentHose): Observable<Assignment[]> {
    return this.http.post<Assignment[]>(`${api_url}/assignmentHose`, assignmentHose, this.headers);
  }


  getAssignmetHoses(formData: AssignmentHose_I): Observable<AssignmentHose_I> {
    return this.http.post<AssignmentHose_I>(`${api_url}/assignmentHose/getAssig`, formData, this.headers);
  }

  getGeneralDispenserReaderId(formData : GeneralDispenserReader_I): Observable<GeneralDispenserReader_I>{
    return this.http.post<GeneralDispenserReader_I>(`${api_url}/generalDispenserReader/generalDispenserReader`, formData, this.headers);
  }
  getIdAssig(formData: Assignment_I): Observable<Assignment_I> {
    return this.http.post<Assignment_I>(`${api_url}/assignment/idAssignment`, formData, this.headers)

  };


  createGeneralDispenserReader(formData : GeneralDispenserReader) : Observable<GeneralDispenserReader[]>{
    return this.http.post<GeneralDispenserReader[]>(`${api_url}/generalDispenserReader`, formData, this.headers);
  }

  createDispenserReader(formData : DispenserReader) : Observable<DispenserReader[]>{
    return this.http.post<DispenserReader[]>(`${api_url}/dispenserReaders`, formData, this.headers);
  }

  
  getPreviousGallons() : Observable<PreviousGallons_I>{
    return this.http.get<PreviousGallons_I>(`${api_url}/dispenserReaders/previousGallon`, this.headers);
  }
 
  getPreviousMechanic() : Observable<PreviousMechanic_I>{
    return this.http.get<PreviousMechanic_I>(`${api_url}/dispenserReaders/previousMechanic`, this.headers);
  }

  getPreviousMoney() : Observable<PreviousMoney_I>{
    return this.http.get<PreviousMoney_I>(`${api_url}/dispenserReaders/previousMoney`, this.headers);
  }

}


