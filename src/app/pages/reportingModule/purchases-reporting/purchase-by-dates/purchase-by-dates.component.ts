import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailPurchaseOrder, Purchase, PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { PurchasesOrderComponent } from 'src/app/pages/purchase/purchases-order/purchases-order.component';
import { PurchasesReportingService } from 'src/app/services/reporting/purchases-reporting.service';

@Component({
  selector: 'app-purchase-by-dates',
  templateUrl: './purchase-by-dates.component.html',
  styleUrls: ['./purchase-by-dates.component.css']
})
export class PurchaseByDatesComponent implements OnInit {

  public purchaseOrderRegular : PurchaseOrder[]=[];
  public purchaseOrderSuper : PurchaseOrder[]=[];
  public purchaseOrderDiesel : PurchaseOrder[]=[];

  public purchaseRegular : Purchase[]=[]; 
  public purchaseSuper : Purchase[]=[]; 
  public purchaseDiesel : Purchase[]=[]; 
  public purchaseReport : Purchase[]=[];
  public greaterPurchase : Purchase[]=[];
  public lesserPurchase :  Purchase[]=[];
  public greaterRegular : Purchase[]=[];
  public lesserRegular :Purchase[]=[];
  public greaterSuper: Purchase[] =[];
  public lesserSuper : Purchase[] =[];
  public greaterDiesel: Purchase[] =[];
  public lesserDiesel: Purchase[] =[];
  public purchaseDetailOrderReport : DetailPurchaseOrder[]=[];
  public purchaseReportTotal : Purchase[]=[]; 
  public totalPurchases : number = 0 ;
  public fm: number = 0;
  btnShowTableGreaterPurchase: boolean = true;
  btnShowTableGreaterRegular: boolean = true;
  btnShowTablelessRegular: boolean = false;
  btnShowTablelesPurchase : boolean = false;
  btnShowTableGreaterSuper : boolean = true;
  btnShowTablelessSuper : boolean = false;
  btnShowTableGreaterDiesel: boolean = true;
  btnShowTablelessDiesel : boolean = false;
  showMeDivLessGreatPurchase : boolean = false;
  showMeDivLessGreatRegular : boolean = false;
  showMeDivLessGreatSuper: boolean = false;
  showMeDivLessGreatDiesel : boolean = false;


  reportingPurchaseForm : FormGroup = this.fb.group({
    initialDate:[''],
    finalDate: [''],
    from: [],
    totalGallonsRegular: [],
    totalGallonsSuper: [],
    totalGallonsDiesel: [],
    totalPurchase: [],

  });

  constructor(
    private fb : FormBuilder,
    private _purchaseRerpotingService : PurchasesReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
  };

  convertDates() {

    const Idate = new Date(this.reportingPurchaseForm.get('initialDate')?.value);
    const Fdate = new Date(this.reportingPurchaseForm.get('finalDate')?.value);

    this.reportingPurchaseForm.controls['initialDate'].setValue(Idate.toISOString());
    this.reportingPurchaseForm.controls['finalDate'].setValue(Fdate.toISOString());
  };

  getPurchaseByDates(){
    this.convertDates();
    this._purchaseRerpotingService.getPurchasesByDates(this.reportingPurchaseForm.value)
      .subscribe(({total, getData}) => {
        console.log(getData)
        console.log(total)
       this.totalPurchases = total;
       if(getData.length !== 0) {
        this.purchaseReport = getData;
       }
      })

  };

  getTotalPurchaseByDates(){
    this.convertDates();
    this._purchaseRerpotingService.getTotalPurchaseByDate(this.reportingPurchaseForm.value)
      .subscribe(({countTotalPurchase}) => {
        this.purchaseReportTotal = countTotalPurchase
      });
  };


  getPurchaseRegularByDate(){
    this.convertDates();
    this._purchaseRerpotingService.getCountSumGallonsRegularPurchase(this.reportingPurchaseForm.value)
      .subscribe(({countTotalPurchaseRegular}) => {
        this.purchaseOrderRegular = countTotalPurchaseRegular;
      });
  };

  getPurchaseSuperByDate(){
    this.convertDates();
    this._purchaseRerpotingService.getCountSumGallonsSuperPurchase(this.reportingPurchaseForm.value)
      .subscribe(({countTotalPurchaseSuper}) => {
        this.purchaseOrderSuper = countTotalPurchaseSuper;
      });
  };

  getPurchaseDieselByDate(){
    this.convertDates();
    this._purchaseRerpotingService.getCountSumGallonsDieselPurchase(this.reportingPurchaseForm.value)
      .subscribe(({countTotalPurchaseDiesel}) => {
        this.purchaseOrderDiesel = countTotalPurchaseDiesel;
      });
  };

  search(){
    this.getPurchaseByDates();
    this.getPurchaseSuperByDate();
    this.getPurchaseRegularByDate();
    this.getPurchaseDieselByDate();
    this.getPurchaseByDates();
    this.getGreaterLessGallons();
  };
  
  newSearch(){
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard/reporteria/reporteComprasporFechas']);
    });
  };

  getGreaterLessGallons(){

    this._purchaseRerpotingService.getGreaterTotalPurchaseByDate(this.reportingPurchaseForm.value)
    .subscribe(({greatePurchase}) =>{
      this.greaterPurchase = greatePurchase
      console.log(greatePurchase)
    });

    this._purchaseRerpotingService.getLesserTotalPurchaseByDate(this.reportingPurchaseForm.value)
    .subscribe(({lesserPurchase}) =>{
      this.lesserPurchase = lesserPurchase
    });

    this._purchaseRerpotingService.getGreaterRegularPurchaseByDate(this.reportingPurchaseForm.value)
    .subscribe(({greaterRegularPurchase}) =>{
      this.greaterRegular = greaterRegularPurchase
    });

    this._purchaseRerpotingService.getLesserRegularPurchaseByDate(this.reportingPurchaseForm.value)
    .subscribe(({lesserRegularPurchase}) =>{
      this.lesserRegular = lesserRegularPurchase
    });


    this._purchaseRerpotingService.getGreaterSuperPurchaseByDate(this.reportingPurchaseForm.value)
    .subscribe(({greaterSuperPurchase}) =>{
      this.greaterSuper = greaterSuperPurchase
    });

    this._purchaseRerpotingService.getLesserSuperPurchaseByDate(this.reportingPurchaseForm.value)
    .subscribe(({lesserSuperPurchase}) =>{
      this.lesserSuper = lesserSuperPurchase
    });

    this._purchaseRerpotingService.getGreaterSuperPurchaseByDate(this.reportingPurchaseForm.value)
    .subscribe(({greaterSuperPurchase}) =>{
      this.greaterDiesel = greaterSuperPurchase
    });

    this._purchaseRerpotingService.getLesserDieselPurchaseByDate(this.reportingPurchaseForm.value)
    .subscribe(({lesserDieselPurchase}) =>{
      this.lesserDiesel = lesserDieselPurchase
    });


  }

  changePage(valor: number){
    this.fm = this.reportingPurchaseForm.get('from')?.value;
    this.fm += valor;
    this.reportingPurchaseForm.controls['from'].setValue(this.fm);

    if((this.reportingPurchaseForm.get('from')?.value) <= 0){
      this.reportingPurchaseForm.controls['from'].setValue(0);
    } else if((this.reportingPurchaseForm.get('from')?.value) >= this.totalPurchases) {
      this.fm -= valor;
      this.reportingPurchaseForm.controls['from'].setValue(this.fm);
    };

    this.getPurchaseByDates();
  };

  buttonShowTableGreaterSales(){
    this.showMeDivLessGreatPurchase = true; 
    this.btnShowTableGreaterPurchase = false;
    this.btnShowTablelesPurchase =true;
  };

  buttonShowTablelessSales(){
    this.showMeDivLessGreatPurchase = false; 
    this.btnShowTableGreaterPurchase = true;
    this.btnShowTablelesPurchase =false;
  };

  buttonShowTableGreaterRegular(){
    this.showMeDivLessGreatRegular = true;
    this.btnShowTableGreaterRegular = false;
    this.btnShowTablelessRegular = true;
  };

  buttonShowTablelessRegular(){
    this.showMeDivLessGreatRegular = false;
    this.btnShowTableGreaterRegular = true;
    this.btnShowTablelessRegular = false;
  };

  buttonShowTableGreaterSuper(){
    this.showMeDivLessGreatSuper = true;
    this.btnShowTableGreaterSuper = false;
    this.btnShowTablelessSuper = true;
  };

  buttonShowTablelessSuper(){
    this.showMeDivLessGreatSuper = false;
    this.btnShowTableGreaterSuper = true;
    this.btnShowTablelessSuper = false;
  };

  buttonShowTableGreaterDiesel(){
    this.showMeDivLessGreatDiesel = true;
    this.btnShowTableGreaterDiesel = false;
    this.btnShowTablelessDiesel = true;
  };

  buttonShowTablelessDiesel(){
    this.showMeDivLessGreatDiesel = false;
    this.btnShowTableGreaterDiesel = true;
    this.btnShowTablelessDiesel = false;
  };


}
