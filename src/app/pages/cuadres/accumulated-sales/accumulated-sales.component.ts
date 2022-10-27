import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralDispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import Swal from 'sweetalert2';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-accumulated-sales',
  templateUrl: './accumulated-sales.component.html',
  styleUrls: ['./accumulated-sales.component.css']
})
export class AccumulatedSalesComponent implements OnInit {

  public salesReport: SalesControl[] = [];
  public accumulatedRegular: GeneralDispenserReader[] = [];//
  public accumulatedSuper: GeneralDispenserReader[] = [];//
  public accumulatedDiesel: GeneralDispenserReader[] = [];//
  public countMoneyRegular: GeneralDispenserReader[] = [];//
  public countMoneySuper: GeneralDispenserReader[] = [];//
  public countMoneyDiesel: GeneralDispenserReader[] = [];//
  public countBills: SalesControl[] = [];//
  public countvales: SalesControl[] = [];//
  public countcoupons: SalesControl[] = [];//
  public countvoucher: SalesControl[] = [];//
  public countdeposits: SalesControl[] = [];
  public countcredits: SalesControl[] = [];
  public countabonos: SalesControl[] = [];
  public counttotal: SalesControl[] = [];
  public countbalance: SalesControl[] = [];
  public sumTotalGallon: GeneralDispenserReader[] = [];//
  public sumMoneyGallon: GeneralDispenserReader[] = [];//

  reportingSaleForm: FormGroup = this.fb.group({
    initialDate: [''],
    finalDate: [''],
    generalDispenser: [],
    accumulatedRegular: [],
    accumulatedSuper: [],
    accumulatedDiesel: [],
    countMoneyRegular: [],
    countMoneySuper: [],
    countMoneyDiesel: [],
    countBills: [],
    countvales: [],
    countcoupons: [],
    countvoucher: [],
    countdeposits: [],
    countcredits: [],
    countabonos: [],
    counttotal: [],
    countbalance: [],
    sumTotalGallon: [],
    sumMoneyGallon: [],

  })
  constructor(
    private fb: FormBuilder,
    private router : Router,
    private _dispenserService: DispensersService,
    private dateAdapter: DateAdapter<Date>,

  ) { }

  ngOnInit(): void {
    this.getAccumulatedGallons();
    this.dateAdapter.setLocale('en-GB');
  }

  convertDates() {

    const Idate = new Date(this.reportingSaleForm.get('initialDate')?.value);
    const Fdate = new Date(this.reportingSaleForm.get('finalDate')?.value);

    this.reportingSaleForm.controls['initialDate'].setValue(Idate.toISOString());
    this.reportingSaleForm.controls['finalDate'].setValue(Fdate.toISOString());
  };

  getAccumulatedGallons() {
    this.convertDates();
    this._dispenserService.getGeneralDispenserListToApplied(this.reportingSaleForm.value)
      .subscribe(({ genrealDispenserReader, countGallonRegular, countGallonSuper, countGallonDiesel,
        countMoneyRegular, countMoneySuper, countMoneyDiesel,
        countBills, countvales, countcoupons, countvoucher, countdeposits, countcredits,
        countabonos, counttotal, countbalance, sumTotalGallon, sumMoneyGallon
      }) => {
        this.salesReport = genrealDispenserReader;
        this.accumulatedSuper = countGallonSuper;
        this.accumulatedRegular = countGallonRegular;
        this.accumulatedDiesel = countGallonDiesel;
        this.countMoneyRegular = countMoneyRegular;
        this.countMoneySuper = countMoneySuper;
        this.countMoneyDiesel = countMoneyDiesel;
        this.countBills = countBills;
        this.countvales = countvales;
        this.countcoupons = countcoupons;
        this.countvoucher = countvoucher
        this.countdeposits = countdeposits;
        this.countcredits = countcredits;
        this.countabonos = countabonos;
        this.counttotal = counttotal;
        this.countbalance = countbalance;
        this.sumTotalGallon = sumTotalGallon;
        this.sumMoneyGallon = sumMoneyGallon;

      })
  }


  updateCloseMonthApplied(){
    this._dispenserService.uptadeCloseMonthReader(this.reportingSaleForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registros modificados',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/dashboard');
      }, error => {
        Swal.fire('Error', error.error.msg, 'error')
      })
      
  }

  updateApplied(){
    Swal.fire({
      title: 'Desea modificar registros?',
      showDenyButton: true,
     // showCancelButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._dispenserService.uptadeCloseMonthReader(this.reportingSaleForm.value)
        .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registros modificados',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/dashboard');
      }, error => {
        Swal.fire('Error', error.error.msg, 'error')
      })
      } else if (result.isDenied) {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'Proceso Cancelado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  search(){
    this.getAccumulatedGallons();
  }

  newSearch(){
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard/reporteria/acumulado-de-ventas']);
    });
  }
}
