import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AssignmentHose_I, Assignment_I, As_I, countGallonsDiesel_I, countGallonsRegular_I, countGallonsSuper_I, countTotalSaleDiesel_I, countTotalSaleRegular_I, countTotalSaleSuper_I, DeleteGnrlDispenserAndDetail_I, DispenserReaderSuper_I,  DispensersA_I,  DispensersB_I,  Dispensers_I, GeneralDispenserReader_I, getGallonsDB_I, getGeneralDispenserListToApplied_I, ListLastNumerationDispenser_I, ListNumerationDispenser_I, PenultimateGallons_I,  previousNoGallonsDiesel1_I,  previousNoGallonsDieselTotal_I,  previousNoGallonsDiesel_I,  previousNoGallonsMechanicDieselTotal_I,  previousNoGallonsMechanicSuperTotal_I,  previousNoGallonsMechanicTotal_I,  previousNoGallonsMoneyDieselTotal_I,  previousNoGallonsMoneySuperTotal_I,  previousNoGallonsMoneyTotal_I,  previousNoGallonsRegularTotal_I,  previousNoGallonsRegular_I, previousNoGallonsSuperTotal_I, previousNoGallonsSuper_I, previousNoGallons_I, previousNoMechanicDiesel1_I, previousNoMechanicDiesel_I, previousNoMechanicRegular_I, previousNoMechanicR_I, previousNoMechanicSuper1_I, previousNoMechanicSuper_I, previousNoMoneyDiesel1_I, previousNoMoneyDiesel_I, previousNoMoneyRegular_I, previousNoMoneyR_I, previousNoMoneySuper1_I, previousNoMoneySuper_I, previousTotalNoGallonRegular_I, previousTotalNoGallonsDiesel_I, previousTotalNoGallonsSuper_I, previousTotalNoMechanicDiesel_I, previousTotalNoMechanicRegular_I, previousTotalNoMechanicSuper_I, previousTotalNoMoneyDiesel_I, previousTotalNoMoneyRegular_I, previousTotalNoMoneySuper_I, SideA_I, SideB_I, TotalDieselGallons_I, TotalGallons_I, TotalRegularGallons_I, TotalSuperGallons_I } from 'src/app/interfaces/fuelstation/dispensers.interface';
import { Assignment, AssignmentHose } from 'src/app/models/fuelstation/assignment.model';
import { DispenserReader, Dispensers, GeneralDispenserReader } from 'src/app/models/fuelstation/dispensers.model';
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

  getDispenserA() : Observable<DispensersA_I>{
    return this.http.get<DispensersA_I>(`${api_url}/dispensers/dispenserA`, this.headers);
  }

  getDispenserB() : Observable<DispensersB_I>{
    return this.http.get<DispensersB_I>(`${api_url}/dispensers/dispenserB`, this.headers);
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
  };

  //obtener el ultimo registo de numeraciond de la bomba de mecanica de regular
  getPreviousMechanic(formData : DispenserReader): Observable<previousNoMechanicR_I> {
    return this.http.post<previousNoMechanicR_I>(`${api_url}/dispenserReaders/previousMechanicRegular`, formData,  this.headers);
  };
  //obtener el ultimo registo de numeraciond de la bomba de dinero de regular
  getPreviousMoney(formData : DispenserReader): Observable<previousNoMoneyR_I> {
    return this.http.post<previousNoMoneyR_I>(`${api_url}/dispenserReaders/previousMoneyRegular`,  formData, this.headers);
  };

  //obtener el ultimo registo de numeraciond de la bomba de gallones de regular  para calcular el penultimo registro
  getPreviousGallons1(formData : DispenserReader ): Observable<previousNoGallonsRegular_I> {
    return this.http.post<previousNoGallonsRegular_I>(`${api_url}/dispenserReaders/previousGallonRegular1`, formData, this.headers);
  };

  // para la numeracion anterior de regular
  getPreviousGallons1Total(formData : DispenserReader ): Observable<previousNoGallonsRegularTotal_I> {
    return this.http.post<previousNoGallonsRegularTotal_I>(`${api_url}/dispenserReaders/previousGallonRegular1`, formData, this.headers);
  };

  // para la numeracion anterior de regular
  getPreviousMechanic1Total(formData : DispenserReader ): Observable<previousNoGallonsMechanicTotal_I> {
    return this.http.post<previousNoGallonsMechanicTotal_I>(`${api_url}/dispenserReaders/previousMechanicRegular1`, formData, this.headers);
  };

  // para la numeracion anterior de regular
  getPreviousMoney1Total(formData : DispenserReader ): Observable<previousNoGallonsMoneyTotal_I> {
    return this.http.post<previousNoGallonsMoneyTotal_I>(`${api_url}/dispenserReaders/previousMoneyRegular1`, formData, this.headers);
  };

  // para la numeracion anterior de super
  getPreviousGallons1SuperTotal(formData : DispenserReader ): Observable<previousNoGallonsSuperTotal_I> {
    return this.http.post<previousNoGallonsSuperTotal_I>(`${api_url}/dispenserReaders/previousGallonSuper1`, formData, this.headers);
  };

  // para la numeracion anterior de super
  getPreviousMechanic1SuperTotal(formData : DispenserReader ): Observable<previousNoGallonsMechanicSuperTotal_I> {
    return this.http.post<previousNoGallonsMechanicSuperTotal_I>(`${api_url}/dispenserReaders/previousMechanicSuper1`, formData, this.headers);
  };

  // para la numeracion anterior de super
  getPreviousMoney1SuperTotal(formData : DispenserReader ): Observable<previousNoGallonsMoneySuperTotal_I> {
    return this.http.post<previousNoGallonsMoneySuperTotal_I>(`${api_url}/dispenserReaders/previousMoneySuper1`, formData, this.headers);
  };


  // para la numeracion anterior de super
  getPreviousGallons1DieselTotal(formData : DispenserReader ): Observable<previousNoGallonsDieselTotal_I> {
    return this.http.post<previousNoGallonsDieselTotal_I>(`${api_url}/dispenserReaders/previousGallonDiesel1`, formData, this.headers);
  };

  // para la numeracion anterior de super
  getPreviousMechanic1DieselTotal(formData : DispenserReader ): Observable<previousNoGallonsMechanicDieselTotal_I> {
    return this.http.post<previousNoGallonsMechanicDieselTotal_I>(`${api_url}/dispenserReaders/previousMechanicDiesel1`, formData, this.headers);
  };

  // para la numeracion anterior de super
  getPreviousMoney1DieselTotal(formData : DispenserReader ): Observable<previousNoGallonsMoneyDieselTotal_I> {
    return this.http.post<previousNoGallonsMoneyDieselTotal_I>(`${api_url}/dispenserReaders/previousMoneyDiesel1`, formData, this.headers);
  };



  getTotalNoGallonsRegular(formData : DispenserReader ): Observable<previousTotalNoGallonRegular_I> {
    return this.http.post<previousTotalNoGallonRegular_I>(`${api_url}/dispenserReaders/previousTotalNoGallonRegular`, formData, this.headers);
  };

   //obtener el ultimo registo de numeraciond de la bomba de gallones de regular  para calcular el penultimo registro
   getPreviousGallonsMechanic1(formData : DispenserReader ): Observable<previousNoMechanicRegular_I> {
    return this.http.post<previousNoMechanicRegular_I>(`${api_url}/dispenserReaders/previousMechanicRegular1`, formData, this.headers);
  };

  getTotalNoMechanicRegular(formData : DispenserReader ): Observable<previousTotalNoMechanicRegular_I> {
    return this.http.post<previousTotalNoMechanicRegular_I>(`${api_url}/dispenserReaders/previousTotalNoMechanicRegular`, formData, this.headers);
  };

  //obtener el ultimo registo de numeraciond de la bomba de gallones de regular  para calcular el penultimo registro
  getPreviousGallonsMoney1(formData : DispenserReader ): Observable<previousNoMoneyRegular_I> {
    return this.http.post<previousNoMoneyRegular_I>(`${api_url}/dispenserReaders/previousMoneyRegular1`, formData, this.headers);
  };

  getTotalNoMoneyRegular(formData : DispenserReader ): Observable<previousTotalNoMoneyRegular_I> {
    return this.http.post<previousTotalNoMoneyRegular_I>(`${api_url}/dispenserReaders/previousTotalNoMoneyRegular`, formData, this.headers);
  };

  //obtener el ultimo registo de numeraciond de la bomba de gallones de super
  getPreviousGallonsSuper(formData : DispenserReader): Observable<previousNoGallonsSuper_I> {
    return this.http.post<previousNoGallonsSuper_I>(`${api_url}/dispenserReaders/previousGallonSuper`, formData,  this.headers);
  };

  //obtener el ultimo registo de numeraciond de la bomba de mecanica de super
  getPreviousMechanicSuper(formData : DispenserReader): Observable<previousNoMechanicSuper_I> {
    return this.http.post<previousNoMechanicSuper_I>(`${api_url}/dispenserReaders/previousMechanicSuper`, formData,  this.headers);
  };
  //obtener el ultimo registo de numeraciond de la bomba de dinero de super
  getPreviousMoneySuper(formData : DispenserReader): Observable<previousNoMoneySuper_I> {
    return this.http.post<previousNoMoneySuper_I>(`${api_url}/dispenserReaders/previousMoneySuper`, formData, this.headers);
  };
  
  //obtener el ultimo registo de numeraciond de la bomba de gallones de super  para calcular el penultimo registro
  getPreviousGallonsSuper1(formData : DispenserReader ): Observable<DispenserReaderSuper_I> {
    return this.http.post<DispenserReaderSuper_I>(`${api_url}/dispenserReaders/previousGallonSuper1`, formData, this.headers);
  };

  getTotalNoGallonsSuper(formData : DispenserReader ): Observable<previousTotalNoGallonsSuper_I> {
    return this.http.post<previousTotalNoGallonsSuper_I>(`${api_url}/dispenserReaders/previousTotalNoGallonSuper`, formData, this.headers);
  };

   //obtener el ultimo registo de numeraciond de la bomba de gallones de super  para calcular el penultimo registro
   getPreviousGallonsMechanicSuper1(formData : DispenserReader ): Observable<previousNoMechanicSuper1_I> {
    return this.http.post<previousNoMechanicSuper1_I>(`${api_url}/dispenserReaders/previousMechanicSuper1`, formData, this.headers);
  };

  getTotalNoMechanicSuper(formData : DispenserReader ): Observable<previousTotalNoMechanicSuper_I> {
    return this.http.post<previousTotalNoMechanicSuper_I>(`${api_url}/dispenserReaders/previousTotalNoMechanicSuper`, formData, this.headers);
  };

  //obtener el ultimo registo de numeraciond de la bomba de gallones de super  para calcular el penultimo registro
  getPreviousGallonsMoneySuper1(formData : DispenserReader ): Observable<previousNoMoneySuper1_I> {
    return this.http.post<previousNoMoneySuper1_I>(`${api_url}/dispenserReaders/previousMoneySuper1`, formData, this.headers);
  };

  getTotalNoMoneySuper(formData : DispenserReader ): Observable<previousTotalNoMoneySuper_I> {
    return this.http.post<previousTotalNoMoneySuper_I>(`${api_url}/dispenserReaders/previousTotalNoMoneySuper`, formData, this.headers);
  };

  getPenultimateGallons(formData : DispenserReader ): Observable<PenultimateGallons_I> {
    return this.http.post<PenultimateGallons_I>(`${api_url}/dispenserReaders/penultimateGallonRegular`, formData, this.headers);
  };

  
  //obtener el ultimo registo de numeraciond de la bomba de gallones de diesl
  getPreviousGallonsDiesel(formData :DispenserReader ): Observable<previousNoGallonsDiesel_I> {
    return this.http.post<previousNoGallonsDiesel_I>(`${api_url}/dispenserReaders/previousGallonDiesel`, formData,  this.headers);
  };
  //obtener el ultimo registo de numeraciond de la bomba de mecanica de diesel
  getPreviousMechanicDiesel(formData :DispenserReader): Observable<previousNoMechanicDiesel_I> {
    return this.http.post<previousNoMechanicDiesel_I>(`${api_url}/dispenserReaders/previousMechanicDiesel`, formData, this.headers);
  };
  //obtener el ultimo registo de numeraciond de la bomba de dinero de diesel
  getPreviousMoneyDiesel(formData :DispenserReader ): Observable<previousNoMoneyDiesel_I> {
    return this.http.post<previousNoMoneyDiesel_I>(`${api_url}/dispenserReaders/previousMoneyDiesel`, formData, this.headers);
  };


  //obtener el ultimo registo de numeraciond de la bomba de gallones de diesl
  getPreviousGallonsDiesel1(formData :DispenserReader ): Observable<previousNoGallonsDiesel1_I> {
    return this.http.post<previousNoGallonsDiesel1_I>(`${api_url}/dispenserReaders/previousGallonDiesel1`, formData,  this.headers);
  };

  

  getTotalNoGallonsDiesel(formData : DispenserReader ): Observable<previousTotalNoGallonsDiesel_I> {
    return this.http.post<previousTotalNoGallonsDiesel_I>(`${api_url}/dispenserReaders/previousTotalNoGallonDiesel`, formData, this.headers);
  };

  //obtener el ultimo registo de numeraciond de la bomba de mecanica de diesel
  getPreviousMechanicDiesel1(formData :DispenserReader): Observable<previousNoMechanicDiesel1_I> {
    return this.http.post<previousNoMechanicDiesel1_I>(`${api_url}/dispenserReaders/previousMechanicDiesel1`, formData, this.headers);
  };

  getTotalNoMechanicDiesel(formData : DispenserReader ): Observable<previousTotalNoMechanicDiesel_I> {
    return this.http.post<previousTotalNoMechanicDiesel_I>(`${api_url}/dispenserReaders/previousTotalNoMechanicDiesel`, formData, this.headers);
  };

  //obtener el ultimo registo de numeraciond de la bomba de dinero de diesel
  getPreviousMoneyDiesel1(formData :DispenserReader ): Observable<previousNoMoneyDiesel1_I> {
    return this.http.post<previousNoMoneyDiesel1_I>(`${api_url}/dispenserReaders/previousMoneyDiesel1`, formData, this.headers);
  };

  getTotalNoMoneyDiesel(formData : DispenserReader ): Observable<previousTotalNoMoneyDiesel_I> {
    return this.http.post<previousTotalNoMoneyDiesel_I>(`${api_url}/dispenserReaders/previousTotalNoMoneyDiesel`, formData, this.headers);
  };

  
  //obtener el detalle de lo registrado de numeracion de bombas

  getActualListNumeration(formData : DispenserReader):Observable<ListNumerationDispenser_I> {
    return this.http.post<ListNumerationDispenser_I>(`${api_url}/dispenserReaders/listResumNumerationDispenser`, formData, this.headers);
  };

  /*getTotalNoGallons (formData : GeneralDispenserReader) : Observable<TotalGallons_I>{
    return this.http.post<TotalGallons_I>(`${api_url}/generalDispenserReader/getTotalGallons`, formData, this.headers);
  }*/

  getTotalNoGallons () : Observable<TotalGallons_I>{
    return this.http.get<TotalGallons_I>(`${api_url}/generalDispenserReader/getTotalGallons`, this.headers);
  };

  //to update the number of gallons that dispenser reader has
  updateTotalGallons(generalDispenserReader : GeneralDispenserReader) : Observable<GeneralDispenserReader[]>{
    return this.http.put<GeneralDispenserReader[]>(`${api_url}/generalDispenserReader/totalGallons/${generalDispenserReader.generalDispenserReaderId}`, generalDispenserReader, this.headers);
  };

  updateDispenserReader(dispenserReader : DispenserReader): Observable<DispenserReader[]>{
    return this.http.put<DispenserReader[]>(`${api_url}/dispenserReaders/update/${dispenserReader.dispenserReaderId}`, dispenserReader, this.headers)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  };

  
  getTotalGallonsRegular(formData : GeneralDispenserReader): Observable<TotalRegularGallons_I>{
    return this.http.post<TotalRegularGallons_I>(`${api_url}/generalDispenserReader/totalRegularGallons`, formData, this.headers);
  };

  getTotalGallonsSuper(formData : GeneralDispenserReader): Observable<TotalSuperGallons_I>{
    return this.http.post<TotalSuperGallons_I>(`${api_url}/generalDispenserReader/totalSuperGallons`, formData, this.headers);
  };

  getTotalGallonsDiesel(formData : GeneralDispenserReader): Observable<TotalDieselGallons_I>{
    return this.http.post<TotalDieselGallons_I>(`${api_url}/generalDispenserReader/totalDieselGallons`, formData, this.headers);
  };

  getCountGallonsRegular(): Observable<countGallonsRegular_I>{
    return this.http.get<countGallonsRegular_I>(`${api_url}/generalDispenserReader/countGallonsRegular`, this.headers);
  }

  getCountGallonsSuper(): Observable<countGallonsSuper_I>{
    return this.http.get<countGallonsSuper_I>(`${api_url}/generalDispenserReader/countGallonsSuper`, this.headers);
  }

  getCountGallonsDiesel(): Observable<countGallonsDiesel_I>{
    return this.http.get<countGallonsDiesel_I>(`${api_url}/generalDispenserReader/countGallonsDiesel`, this.headers);
  }

  getGallonsDB (formData :GeneralDispenserReader) : Observable<getGallonsDB_I>{
    return this.http.post<getGallonsDB_I>(`${api_url}/generalDispenserReader/gallonRegular`, formData,  this.headers);
  }

  getResumeLastNumerationDispenser(): Observable<ListLastNumerationDispenser_I>{
    return this.http.get<ListLastNumerationDispenser_I>(`${api_url}/dispenserReaders/listResumLastNumerationDispenser`,  this.headers);
  }

  deleteGnralDispenserReaderAndDetail(formData :GeneralDispenserReader): Observable<DeleteGnrlDispenserAndDetail_I>{
    return this.http.post<DeleteGnrlDispenserAndDetail_I>(`${api_url}/generalDispenserReader/deleteDetail`, formData,  this.headers);
  }
  
  getGeneralDispenserListToApplied(formData : GeneralDispenserReader): Observable<getGeneralDispenserListToApplied_I>{
    return this.http.post<getGeneralDispenserListToApplied_I>(`${api_url}/generalDispenserReader/getGeneralDispenserReadertoCLoseMonth`, formData, this.headers);
  }

  uptadeCloseMonthReader(formData : GeneralDispenserReader): Observable<GeneralDispenserReader[]>{
    return this.http.post<GeneralDispenserReader[]>(`${api_url}/generalDispenserReader/updateApplied`, formData, this.headers);
  };

  updateTotalGallonsByUdpdatingRegular(formData : GeneralDispenserReader): Observable<GeneralDispenserReader[]>{
    return this.http.post<GeneralDispenserReader[]>(`${api_url}/generalDispenserReader/updateTotalGallonsByUdpdatingRegular`, formData, this.headers);
  }

  updateTotalGallonsByUdpdatingSuper(formData : GeneralDispenserReader): Observable<GeneralDispenserReader[]>{
    return this.http.post<GeneralDispenserReader[]>(`${api_url}/generalDispenserReader/updateTotalGallonsByUdpdatingSuper`, formData, this.headers);
  }

  updateTotalGallonsByUdpdatingDiesel(formData : GeneralDispenserReader): Observable<GeneralDispenserReader[]>{
    return this.http.post<GeneralDispenserReader[]>(`${api_url}/generalDispenserReader/updateTotalGallonsByUdpdatingDiesel`, formData, this.headers);
  }

};


