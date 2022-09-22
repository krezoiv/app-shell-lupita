import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeneralDispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { SalesReportingService } from 'src/app/services/reporting/sales-reporting.service';
import { SalesControlService } from 'src/app/services/sales/sales-control.service';
import { TimerComponent } from 'src/app/shared/functions/timer/timer.component';


@Component({
  selector: 'app-sales-by-dates',
  templateUrl: './sales-by-dates.component.html',
  styleUrls: ['./sales-by-dates.component.css']
})
export class SalesByDatesComponent implements OnInit {

  public generalDispenserRegular: GeneralDispenserReader[] = [];
  public generalDispenserSuper: GeneralDispenserReader[] = [];
  public generalDispenserDiesel: GeneralDispenserReader[] = [];
  public salesReport: SalesControl[] = [];
  public salesReportTotal: SalesControl[] = [];
  public greaterRegular: SalesControl[] = [];
  public lesserRegular: SalesControl[] = [];
  public greaterSuper: SalesControl[] = [];
  public lesserSuper: SalesControl[] = [];
  public greaterDiesel: SalesControl[] = [];
  public lesserDiesel: SalesControl[] = [];
  public greaterSale: SalesControl[] = [];
  public lesserSale: SalesControl[] = [];

  public totalSales: number = 0;
  public fm: number = 0;
  public fm2: number = 0;
  showMeDivLessGreatSale: boolean = false;
  showMeDivLessGreatRegular: boolean = false;
  showMeDivLessGreatSuper: boolean = false;
  showMeDivLessGreatDiesel: boolean = false;
  btnShowTableGreaterSales : boolean = true;
  btnShowTablelessSales : boolean = false;
  btnShowTableGreaterRegular : boolean = true;
  btnShowTablelessRegular : boolean = false;
  btnShowTableGreaterSuper : boolean = true;
  btnShowTablelessSuper : boolean = false;
  btnShowTableGreaterDiesel : boolean = true;
  btnShowTablelessDiesel : boolean = false;

  reportingSaleForm: FormGroup = this.fb.group({
    initialDate: [''],
    finalDate: [''],
    from: [0],
    totalGallonsRegular: [],
    totalGallonsSuper: [],
    totalGallonsDiesel: [],
    total: [],

  })

  constructor(
    private fb: FormBuilder,
    
    private _salesReportingService : SalesReportingService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    
  }


  convertDates() {

    const Idate = new Date(this.reportingSaleForm.get('initialDate')?.value);
    const Fdate = new Date(this.reportingSaleForm.get('finalDate')?.value);

    this.reportingSaleForm.controls['initialDate'].setValue(Idate.toISOString());
    this.reportingSaleForm.controls['finalDate'].setValue(Fdate.toISOString());
  };

  getTotalSales() {
    
    this._salesReportingService.getTotalSales()
      .subscribe(({ countTotalSale }) => {
        this.totalSales = countTotalSale;
        console.log(countTotalSale)
      })
  }

  getSalesByDate() {
    this.convertDates();
    this._salesReportingService.getSalesByDates(this.reportingSaleForm.value)
      .subscribe(({ total, getData }) => {
        this.totalSales = total;
       if(getData.length !==0){
        this.salesReport = getData;
       }
      });
  };

  getTotalSalesbyDates() {
    this.convertDates();
    this._salesReportingService.getTotalSalesByDate(this.reportingSaleForm.value)
      .subscribe(({ countTotalSale }) => {
        this.salesReportTotal = countTotalSale;
      })
  }

  getSalesRegularByDate() {
    this.convertDates();
    this._salesReportingService.getCountSumGallonsRegular(this.reportingSaleForm.value)
      .subscribe(({ countTotalSaleRegular }) => {
        this.generalDispenserRegular = countTotalSaleRegular
      })
  };

  getSalesSuperByDate() {
    this.convertDates();
    this._salesReportingService.getCountSumGallonsSuper(this.reportingSaleForm.value)
      .subscribe(({ countTotalSaleSuper }) => {
        this.generalDispenserSuper = countTotalSaleSuper
      })
  };

  getSalesDieselByDate() {
    this.convertDates();
    this._salesReportingService.getCountSumGallonsDiesel(this.reportingSaleForm.value)
      .subscribe(({ countTotalSaleDiesel }) => {
        this.generalDispenserDiesel = countTotalSaleDiesel
      })
  };

  getAllSale() {
    this._salesReportingService.getAllSales(this.reportingSaleForm.value)
      .subscribe(({ total, getData }) => {
        this.totalSales = total;
        this.salesReport = getData;
        console.log(total, getData)
        console.log(this.reportingSaleForm.value);
      })
  };


  search() {
    
      this.getSalesByDate();
      this.getSalesSuperByDate()
      this.getSalesRegularByDate();
      this.getSalesDieselByDate();
      this.getTotalSalesbyDates();
      this.getGreaterLesserGallons();
    
  }

  getGreaterLesserGallons(){
    this._salesReportingService.getGreaterTotalSaleByDate(this.reportingSaleForm.value)
    .subscribe(({greaterSale}) =>{
      this.greaterSale = greaterSale
    });

    this._salesReportingService.getLesserTotalSaleByDate(this.reportingSaleForm.value)
    .subscribe(({lersserSale}) =>{
      this.lesserSale = lersserSale
    });

    this._salesReportingService.getGreaterRegularGallonsByDate(this.reportingSaleForm.value)
      .subscribe(({greaterRegularGallons}) =>{
        this.greaterRegular = greaterRegularGallons
      });

      this._salesReportingService.getLesserRegularGallonsByDate(this.reportingSaleForm.value)
      .subscribe(({lesserRegularGallons}) =>{
        this.lesserRegular = lesserRegularGallons
      });

      this._salesReportingService.getGreaterSuperGallonsByDate(this.reportingSaleForm.value)
      .subscribe(({greaterSuperGallon}) =>{
        this.greaterSuper = greaterSuperGallon
      });

      this._salesReportingService.getLesserSuperGallonsByDate(this.reportingSaleForm.value)
      .subscribe(({lesserSuperGallons}) =>{
        this.lesserSuper = lesserSuperGallons
      });

      this._salesReportingService.getGreaterDieselGallonsByDate(this.reportingSaleForm.value)
      .subscribe(({greaterDieselGallons}) =>{
        this.greaterDiesel = greaterDieselGallons
      
      });

      this._salesReportingService.getLesserDieselGallonsByDate(this.reportingSaleForm.value)
      .subscribe(({lesserDieselGallons}) =>{
        this.lesserDiesel = lesserDieselGallons
      }); 
  }

  changePage(valor: number) {
  
    this.fm = this.reportingSaleForm.get('from')?.value;
    this.fm += valor;
    this.reportingSaleForm.controls['from'].setValue(this.fm);
    
    if ((this.reportingSaleForm.get('from')?.value) <= 0) {
      this.reportingSaleForm.controls['from'].setValue(0);
     
    } else if ((this.reportingSaleForm.get('from')?.value) >= this.totalSales) {
      this.fm -= valor;
      this.reportingSaleForm.controls['from'].setValue(this.fm);
      
    };
    this.getSalesByDate();
   

  };

  buttonShowTableGreaterSales(){ 
    this.showMeDivLessGreatSale = true;
    this.btnShowTableGreaterSales = false;
    this.btnShowTablelessSales = true;
  }

  buttonShowTablelessSales(){
    this.showMeDivLessGreatSale = false;
    this.btnShowTableGreaterSales = true;
    this.btnShowTablelessSales = false;
  }

  buttonShowTableGreaterRegular(){ 
    this.showMeDivLessGreatRegular = true;
    this.btnShowTableGreaterRegular = false;
    this.btnShowTablelessRegular = true;
  }

  buttonShowTablelessRegular(){
    this.showMeDivLessGreatRegular = false;
    this.btnShowTableGreaterRegular = true;
    this.btnShowTablelessRegular = false;
  }

  buttonShowTableGreaterSuper(){ 
    this.showMeDivLessGreatSuper = true;
    this.btnShowTableGreaterSuper = false;
    this.btnShowTablelessSuper = true;
  }

  buttonShowTablelessSuper(){
    this.showMeDivLessGreatSuper = false;
    this.btnShowTableGreaterSuper = true;
    this.btnShowTablelessSuper = false;
  }

  buttonShowTableGreaterDiesel(){ 
    this.showMeDivLessGreatDiesel = true;
    this.btnShowTableGreaterDiesel = false;
    this.btnShowTablelessDiesel = true;
  }

  buttonShowTablelessDiesel(){
    this.showMeDivLessGreatDiesel = false;
    this.btnShowTableGreaterDiesel = true;
    this.btnShowTablelessDiesel = false;
  }

  newSearch() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard/reporteria/reporteVentasporFechas']);
    });

  }

}
