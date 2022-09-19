import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DetailPurchaseOrder, Purchase } from 'src/app/models/purchase/purchaseOrder.model';

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
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
  }


  search(){

  }

  newSearch(){

  }

  changePage(valor: number){

  }

  buttonShowTableGreaterSales(){
    this.showMeDivLessGreatPurchase = true; 
  }

  buttonShowTablelessSales(){}

  buttonShowTableGreaterRegular(){}

  buttonShowTablelessRegular(){}

  buttonShowTableGreaterSuper(){}

  buttonShowTablelessSuper(){} 

  buttonShowTableGreaterDiesel(){}

  buttonShowTablelessDiesel(){}
}
