import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DetailPurchaseOrder, Purchase } from 'src/app/models/purchase/purchaseOrder.model';
import { PurchasesReportingService } from 'src/app/services/reporting/purchases-reporting.service';

@Component({
  selector: 'app-purchase-by-dates',
  templateUrl: './purchase-by-dates.component.html',
  styleUrls: ['./purchase-by-dates.component.css']
})
export class PurchaseByDatesComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
  }

  convertDates() {

    const Idate = new Date(this.reportingPurchaseForm.get('initialDate')?.value);
    const Fdate = new Date(this.reportingPurchaseForm.get('finalDate')?.value);

    this.reportingPurchaseForm.controls['initialDate'].setValue(Idate.toISOString());
    this.reportingPurchaseForm.controls['finalDate'].setValue(Fdate.toISOString());
  };

  getTotalPurchaseByDates(){
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

  }

  search(){
    this.getTotalPurchaseByDates();
  }

  newSearch(){

  }

  changePage(valor: number){

  }

  buttonShowTableGreaterSales(){
    this.showMeDivLessGreatPurchase = true; 
    this.btnShowTableGreaterPurchase = false;
    this.btnShowTablelesPurchase =true;
  }

  buttonShowTablelessSales(){
    this.showMeDivLessGreatPurchase = false; 
    this.btnShowTableGreaterPurchase = true;
    this.btnShowTablelesPurchase =false;
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
}
