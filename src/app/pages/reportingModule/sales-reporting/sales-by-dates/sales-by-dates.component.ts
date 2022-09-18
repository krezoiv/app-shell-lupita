import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralDispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { SalesControlService } from 'src/app/services/sales/sales-control.service';
import { TimerComponent } from 'src/app/shared/functions/timer/timer.component';


@Component({
  selector: 'app-sales-by-dates',
  templateUrl: './sales-by-dates.component.html',
  styleUrls: ['./sales-by-dates.component.css']
})
export class SalesByDatesComponent implements OnInit {

  public totalSales: number = 0;
  public salesReport: SalesControl[] = [];
  public generalDispenserRegular: GeneralDispenserReader[] = [];
  public generalDispenserSuper: GeneralDispenserReader[] = [];
  public generalDispenserDiesel: GeneralDispenserReader[] = [];
  public fm: number = 0;
  public fm2: number = 0;

  reportingSaleForm: FormGroup = this.fb.group({
    initialDate: [''],
    finalDate: [''],
    from: [1],
    totalGallonsRegular: [],
    totalGallonsSuper: [],
    totalGallonsDiesel: [],
    total: [],

  })

  constructor(
    private fb: FormBuilder,
    private _salesControlService: SalesControlService,
    private _dispenserService: DispensersService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    //this.getSalesByDate();
    //this.getAllSale();
  }


  convertDates() {

    const Idate = new Date(this.reportingSaleForm.get('initialDate')?.value);
    const Fdate = new Date(this.reportingSaleForm.get('finalDate')?.value);

    this.reportingSaleForm.controls['initialDate'].setValue(Idate.toISOString());
    this.reportingSaleForm.controls['finalDate'].setValue(Fdate.toISOString());
  };


  getSalesByDate() {
    this.convertDates();
    this._salesControlService.getSalesByDates(this.reportingSaleForm.value)
      .subscribe(({ total, getData }) => {
        this.totalSales = total;
       if(getData.length !==0){
        this.salesReport = getData;
       }
      });
  };

  getTotalSalesbyDates() {
    this.convertDates();
    this._salesControlService.getTotalSalesByDate(this.reportingSaleForm.value)
      .subscribe(({ countTotalSale }) => {
        this.salesReport = countTotalSale;
      })
  }

  getSalesRegularByDate() {
    this.convertDates();
    this._dispenserService.getCountSumGallonsRegular(this.reportingSaleForm.value)
      .subscribe(({ countTotalSaleRegular }) => {
        this.generalDispenserRegular = countTotalSaleRegular
      })
  };

  getSalesSuperByDate() {
    this.convertDates();
    this._dispenserService.getCountSumGallonsSuper(this.reportingSaleForm.value)
      .subscribe(({ countTotalSaleSuper }) => {
        this.generalDispenserSuper = countTotalSaleSuper
      })
  };

  getSalesDieselByDate() {
    this.convertDates();
    this._dispenserService.getCountSumGallonsDiesel(this.reportingSaleForm.value)
      .subscribe(({ countTotalSaleDiesel }) => {
        this.generalDispenserDiesel = countTotalSaleDiesel
      })
  };




  getAllSale() {
    this._salesControlService.getAllSales(this.reportingSaleForm.value)
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
    
  }

  changePage(valor: number) {
    this.getSalesByDate();
    this.fm = this.reportingSaleForm.get('from')?.value;
    this.fm += valor;
    this.reportingSaleForm.controls['from'].setValue(this.fm);

    if ((this.reportingSaleForm.get('from')?.value) <= 1) {
      this.reportingSaleForm.controls['from'].setValue(1);
      this.getSalesByDate();

    } else if ((this.reportingSaleForm.get('from')?.value) >= this.totalSales) {
      this.fm -= valor;
      this.reportingSaleForm.controls['from'].setValue(this.fm);
      this.getSalesByDate();

    };
    

  };

}
