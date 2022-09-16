import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeneralDispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { SalesControlService } from 'src/app/services/sales/sales-control.service';


 
@Component({
  selector: 'app-sales-by-dates',
  templateUrl: './sales-by-dates.component.html',
  styleUrls: ['./sales-by-dates.component.css']
})
export class SalesByDatesComponent implements OnInit {
  
  public totalSales: number = 0;
  public salesReport: SalesControl[] = [];
  public generalDispenser: GeneralDispenserReader[]= [];
  public fm: number = 0;
  public fm2: number = 0;

  reportingSaleForm: FormGroup = this.fb.group({
    initialDate: [''],
    finalDate: [''],
    from :[0],
    totalGallonsRegular :[],
   
  })

  constructor(
    private fb: FormBuilder,
    private _salesControlService: SalesControlService,
    private _dispenserService : DispensersService
  ) { }

  ngOnInit(): void {
   //this.getSalesByDate();
  //this.getAllSale();
  }

  convertDates(){

    const Idate = new Date(this.reportingSaleForm.get('initialDate')?.value);
    const Fdate = new Date (this.reportingSaleForm.get('finalDate')?.value);

    this.reportingSaleForm.controls['initialDate'].setValue(Idate.toISOString());
    this.reportingSaleForm.controls['finalDate'].setValue(Fdate.toISOString());  
  };


  getSalesByDate() {
    this.convertDates();
 
    this._salesControlService.getSalesByDates(this.reportingSaleForm.value)
      .subscribe(({ total, getData }) => {
        this.totalSales = total;
        this.salesReport = getData;
       
        console.log(this.reportingSaleForm.value);
       
      })
  };

  getSalesRegularByDate() {
    this.convertDates();
 
    this._dispenserService.getCountSumGallonsDiesel(this.reportingSaleForm.value)
      .subscribe(({ countTotalSale }) => {
       this.generalDispenser = countTotalSale
        console.log(countTotalSale)
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
   this.getSalesRegularByDate();
   // this.getAllSale();
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
    //this.getAllSale();
  };

}
