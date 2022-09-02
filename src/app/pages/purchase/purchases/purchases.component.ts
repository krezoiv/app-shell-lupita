import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentMethods } from 'src/app/models/purchase/paymentMethods.models';
import { DetailPurchaseOrder, PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { PurchasesService } from 'src/app/services/purchase/purchases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
 
  public paymentMethodSelected : PaymentMethods[] = [];
  public purchaseOrderSelected : PurchaseOrder[] = [];
  public ditailOrder :DetailPurchaseOrder[]=[];

 

  purchaseForm : FormGroup = this.fb.group({
    orderNumber : ['', Validators.required],
    orderDate : ['', Validators.required],
    deliveryDate : ['', Validators.required],
    invoiceSerie: ['', Validators.required],
    invoiceDocument: ['', Validators.required],
    paymentMethodId: ['', Validators.required],
    applied :  [false, Validators.required],
    totalPurchase : [, Validators.required],
    turn : ['', Validators.required],
    vehicleId : ['', Validators.required],
    storeId : ['', Validators.required],
    purchaseOrderId : ['', Validators.required],
    fuelId: ['', Validators.required],
    amount:  ['', Validators.required],
    idp:  ['', Validators.required],
    total : ['', Validators.required],
   
  })
  constructor(
    private fb : FormBuilder,
    private _purchaseService : PurchasesService
  ) { }

  ngOnInit(): void {
    this.getPaymentMethdos();
    this.getdetailPurchaseOderInfo();
  }

  findOrder(){
    this._purchaseService.getInfoPurchaseOrder(this.purchaseForm.value)
      .subscribe((infoPurchaseOrder) => {
        this.purchaseForm.controls['vehicleId'].setValue(infoPurchaseOrder.infoPurchaseOrder.vehicleId.vehicleName);
        this.purchaseForm.controls['orderDate'].setValue(infoPurchaseOrder.infoPurchaseOrder.orderDate);
        this.purchaseForm.controls['deliveryDate'].setValue(infoPurchaseOrder.infoPurchaseOrder.deliveryDate);
        this.purchaseForm.controls['storeId'].setValue(infoPurchaseOrder.infoPurchaseOrder.storeId.storeName);
        this.purchaseForm.controls['totalPurchase'].setValue(infoPurchaseOrder.infoPurchaseOrder.totalPurchaseOrder);
        console.log(this.purchaseForm.value);
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  };

  getPaymentMethdos(){
    this._purchaseService.getPaymentMethods()
        .subscribe(({paymentMethod}) => {
          this.paymentMethodSelected = paymentMethod;
         
        })
  }

  getdetailPurchaseOderInfo(){
    this._purchaseService.getDetailPurchaseOrder(this.purchaseForm.value)   
        .subscribe(({detailPurchaseOderInfo}) => {
         this.ditailOrder = detailPurchaseOderInfo

        });
  };




};
