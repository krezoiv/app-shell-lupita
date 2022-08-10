import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AssignmentHose_I, AssignmentHose_In, Assignment_I, As_I, DispenserReaderSuper_I,  Dispensers_I, GeneralDispenserReader_I, ListNumerationDispenser_I, PenultimateGallons_I,  previousNoGallonsDiesel1_I,  previousNoGallonsDiesel_I,  previousNoGallonsRegular_I, previousNoGallonsSuper_I, previousNoGallons_I, previousNoMechanicDiesel1_I, previousNoMechanicDiesel_I, previousNoMechanicRegular_I, previousNoMechanicR_I, previousNoMechanicSuper1_I, previousNoMechanicSuper_I, previousNoMoneyDiesel1_I, previousNoMoneyDiesel_I, previousNoMoneyRegular_I, previousNoMoneyR_I, previousNoMoneySuper1_I, previousNoMoneySuper_I, SideA_I, SideB_I, TotalGallons_I } from 'src/app/interfaces/fuelstation/dispensers.interface';
import { Assignment, AssignmentHose } from 'src/app/models/fuelstation/assignment.model';
import { DispenserReader, Dispensers, GeneralDispenserReader, SideDispenser } from 'src/app/models/fuelstation/dispensers.model';
import { environment } from 'src/environments/environment';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class DispensersService {

  private _refresh$ = new Subject<void>();
  private _refreshDetail$ = new Subject<void>();
  constructor(
    private http: HttpClient
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

  getDIspensers(): Observable<Dispensers_I> {
    return this.http.get<Dispensers_I>(`${api_url}/dispensers`, this.headers);
  }


//
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

  getGeneralDispenserReaderId(formData: GeneralDispenserReader_I): Observable<GeneralDispenserReader_I> {
    return this.http.post<GeneralDispenserReader_I>(`${api_url}/generalDispenserReader/generalDispenserReader`, formData, this.headers);
  }
  getIdAssig(formData: Assignment_I): Observable<Assignment_I> {
    return this.http.post<Assignment_I>(`${api_url}/assignment/idAssignment`, formData, this.headers)

  };


  createGeneralDispenserReader(formData: GeneralDispenserReader): Observable<GeneralDispenserReader> {
    return this.http.post<GeneralDispenserReader>(`${api_url}/generalDispenserReader`, formData, this.headers);
  }

  createDispenserReader(formData: DispenserReader): Observable<DispenserReader> {
    return this.http.post<DispenserReader>(`${api_url}/dispenserReaders`, formData, this.headers)
    .pipe(
      tap(() => {
        this._refreshDetail$.next();
      })
    );
  }


  //obtener el ultimo registo de numeraciond de la bomba de gallones de regular 
  getPreviousGallons(formData : DispenserReader ): Observable<previousNoGallons_I> {
    return this.http.post<previousNoGallons_I>(`${api_url}/dispenserReaders/previousGallonRegular`, formData, this.headers);
  }

  //obtener el ultimo registo de numeraciond de la bomba de mecanica de regular
  getPreviousMechanic(formData : DispenserReader): Observable<previousNoMechanicR_I> {
    return this.http.post<previousNoMechanicR_I>(`${api_url}/dispenserReaders/previousMechanicRegular`, formData,  this.headers);
  }
  //obtener el ultimo registo de numeraciond de la bomba de dinero de regular
  getPreviousMoney(formData : DispenserReader): Observable<previousNoMoneyR_I> {
    return this.http.post<previousNoMoneyR_I>(`${api_url}/dispenserReaders/previousMoneyRegular`,  formData, this.headers);
  }

  //obtener el ultimo registo de numeraciond de la bomba de gallones de regular  para calcular el penultimo registro
  getPreviousGallons1(formData : DispenserReader ): Observable<previousNoGallonsRegular_I> {
    return this.http.post<previousNoGallonsRegular_I>(`${api_url}/dispenserReaders/previousGallonRegular1`, formData, this.headers);
  }

   //obtener el ultimo registo de numeraciond de la bomba de gallones de regular  para calcular el penultimo registro
   getPreviousGallonsMechanic1(formData : DispenserReader ): Observable<previousNoMechanicRegular_I> {
    return this.http.post<previousNoMechanicRegular_I>(`${api_url}/dispenserReaders/previousMechanicRegular1`, formData, this.headers);
  }

  //obtener el ultimo registo de numeraciond de la bomba de gallones de regular  para calcular el penultimo registro
  getPreviousGallonsMoney1(formData : DispenserReader ): Observable<previousNoMoneyRegular_I> {
    return this.http.post<previousNoMoneyRegular_I>(`${api_url}/dispenserReaders/previousMoneyRegular1`, formData, this.headers);
  }

  //obtener el ultimo registo de numeraciond de la bomba de gallones de super
  getPreviousGallonsSuper(formData : DispenserReader): Observable<previousNoGallonsSuper_I> {
    return this.http.post<previousNoGallonsSuper_I>(`${api_url}/dispenserReaders/previousGallonSuper`, formData,  this.headers);
  }

  //obtener el ultimo registo de numeraciond de la bomba de mecanica de super
  getPreviousMechanicSuper(formData : DispenserReader): Observable<previousNoMechanicSuper_I> {
    return this.http.post<previousNoMechanicSuper_I>(`${api_url}/dispenserReaders/previousMechanicSuper`, formData,  this.headers);
  }
  //obtener el ultimo registo de numeraciond de la bomba de dinero de super
  getPreviousMoneySuper(formData : DispenserReader): Observable<previousNoMoneySuper_I> {
    return this.http.post<previousNoMoneySuper_I>(`${api_url}/dispenserReaders/previousMoneySuper`, formData, this.headers);
  }
  
  //obtener el ultimo registo de numeraciond de la bomba de gallones de super  para calcular el penultimo registro
  getPreviousGallonsSuper1(formData : DispenserReader ): Observable<DispenserReaderSuper_I> {
    return this.http.post<DispenserReaderSuper_I>(`${api_url}/dispenserReaders/previousGallonSuper1`, formData, this.headers);
  }

   //obtener el ultimo registo de numeraciond de la bomba de gallones de super  para calcular el penultimo registro
   getPreviousGallonsMechanicSuper1(formData : DispenserReader ): Observable<previousNoMechanicSuper1_I> {
    return this.http.post<previousNoMechanicSuper1_I>(`${api_url}/dispenserReaders/previousMechanicSuper1`, formData, this.headers);
  }

  //obtener el ultimo registo de numeraciond de la bomba de gallones de super  para calcular el penultimo registro
  getPreviousGallonsMoneySuper1(formData : DispenserReader ): Observable<previousNoMoneySuper1_I> {
    return this.http.post<previousNoMoneySuper1_I>(`${api_url}/dispenserReaders/previousMoneySuper1`, formData, this.headers);
  }

  getPenultimateGallons(formData : DispenserReader ): Observable<PenultimateGallons_I> {
    return this.http.post<PenultimateGallons_I>(`${api_url}/dispenserReaders/penultimateGallonRegular`, formData, this.headers);
  }

  
  //obtener el ultimo registo de numeraciond de la bomba de gallones de diesl
  getPreviousGallonsDiesel(formData :DispenserReader ): Observable<previousNoGallonsDiesel_I> {
    return this.http.post<previousNoGallonsDiesel_I>(`${api_url}/dispenserReaders/previousGallonDiesel`, formData,  this.headers);
  }
  //obtener el ultimo registo de numeraciond de la bomba de mecanica de diesel
  getPreviousMechanicDiesel(formData :DispenserReader): Observable<previousNoMechanicDiesel_I> {
    return this.http.post<previousNoMechanicDiesel_I>(`${api_url}/dispenserReaders/previousMechanicDiesel`, formData, this.headers);
  }
  //obtener el ultimo registo de numeraciond de la bomba de dinero de diesel
  getPreviousMoneyDiesel(formData :DispenserReader ): Observable<previousNoMoneyDiesel_I> {
    return this.http.post<previousNoMoneyDiesel_I>(`${api_url}/dispenserReaders/previousMoneyDiesel`, formData, this.headers);
  }


  //obtener el ultimo registo de numeraciond de la bomba de gallones de diesl
  getPreviousGallonsDiesel1(formData :DispenserReader ): Observable<previousNoGallonsDiesel1_I> {
    return this.http.post<previousNoGallonsDiesel1_I>(`${api_url}/dispenserReaders/previousGallonDiesel1`, formData,  this.headers);
  }
  //obtener el ultimo registo de numeraciond de la bomba de mecanica de diesel
  getPreviousMechanicDiesel1(formData :DispenserReader): Observable<previousNoMechanicDiesel1_I> {
    return this.http.post<previousNoMechanicDiesel1_I>(`${api_url}/dispenserReaders/previousMechanicDiesel1`, formData, this.headers);
  }
  //obtener el ultimo registo de numeraciond de la bomba de dinero de diesel
  getPreviousMoneyDiesel1(formData :DispenserReader ): Observable<previousNoMoneyDiesel1_I> {
    return this.http.post<previousNoMoneyDiesel1_I>(`${api_url}/dispenserReaders/previousMoneyDiesel1`, formData, this.headers);
  }

  /*
  //obtener el ultimo registo de numeraciond de la bomba de gallones de Vpower
  getPreviousGallonsVpower(formData : DispenserReader): Observable<PreviousGallons_I> {
    return this.http.post<PreviousGallons_I>(`${api_url}/dispenserReaders/previousGallonVpower`, formData, this.headers);
  }
  //obtener el ultimo registo de numeraciond de la bomba de mecanica de Vpower
  getPreviousMechanicVpower(formData :DispenserReader): Observable<PreviousMechanic_I> {
    return this.http.post<PreviousMechanic_I>(`${api_url}/dispenserReaders/previousMechanicVpower`, formData, this.headers);
  }
  //obtener el ultimo registo de numeraciond de la bomba de dinero de Vpower
  getPreviousMoneyVpower(formData:DispenserReader ): Observable<PreviousMoney_I> {
    return this.http.post<PreviousMoney_I>(`${api_url}/dispenserReaders/previousMoneyVpower`, formData, this.headers);
  }
  */

  //obtener el detalle de lo registrado de numeracion de bombas

  getActualListNumeration(formData : DispenserReader):Observable<ListNumerationDispenser_I> {
    return this.http.post<ListNumerationDispenser_I>(`${api_url}/dispenserReaders/listResumNumerationDispenser`, formData, this.headers);
  }

  /*getTotalNoGallons (formData : GeneralDispenserReader) : Observable<TotalGallons_I>{
    return this.http.post<TotalGallons_I>(`${api_url}/generalDispenserReader/getTotalGallons`, formData, this.headers);
  }*/

  getTotalNoGallons () : Observable<TotalGallons_I>{
    return this.http.get<TotalGallons_I>(`${api_url}/generalDispenserReader/getTotalGallons`, this.headers);
  }

  //to update the number of gallons that dispenser reader has
  updateTotalGallons(generalDispenserReader : GeneralDispenserReader) : Observable<GeneralDispenserReader[]>{
    return this.http.put<GeneralDispenserReader[]>(`${api_url}/generalDispenserReader/totalGallons/${generalDispenserReader.generalDispenserReaderId}`, generalDispenserReader, this.headers);
  }

  updateDispenserReader(dispenserReader : DispenserReader): Observable<DispenserReader[]>{
    return this.http.put<DispenserReader[]>(`${api_url}/dispenserReaders/update/${dispenserReader.dispenserReaderId}`, dispenserReader, this.headers)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }


}


