import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { SalesControlService } from 'src/app/services/sales/sales-control.service';

@Component({
  selector: 'app-sales-by-dates',
  templateUrl: './sales-by-dates.component.html',
  styleUrls: ['./sales-by-dates.component.css']
})
export class SalesByDatesComponent implements OnInit {

  public totalSales: number = 0;
  public salesReport: SalesControl[] = [];
  public fm: number = 0;
  public fm2: number = 0;

  reportingSaleForm: FormGroup = this.fb.group({
    initialDate: [''],
    finalDate: [''],
    from :[0]
   
  })

  constructor(
    private fb: FormBuilder,
    private _salesControlService: SalesControlService
  ) { }

  ngOnInit(): void {
    this.getSalesByDate();
  //this.getAllSale();
  }

  getSalesByDate() {

    const data = {
      ...this.reportingSaleForm
    }
    this._salesControlService.getSalesByDates(this.reportingSaleForm.value)
      .subscribe(({ total, getData }) => {
        this.totalSales = total;
        this.salesReport = getData;
        console.log(total, getData);
        console.log(this.reportingSaleForm.value);
        console.log(this.fm)
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
