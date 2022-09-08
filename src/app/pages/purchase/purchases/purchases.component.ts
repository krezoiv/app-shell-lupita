import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentMethods } from 'src/app/models/purchase/paymentMethods.models';
import { DetailPurchaseOrder, PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { FuelInventoryService } from 'src/app/services/fuelstation/fuel-inventory.service';
import { PurchasesService } from 'src/app/services/purchase/purchases.service';
import { TimerComponent } from 'src/app/shared/functions/timer/timer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  public paymentMethodSelected: PaymentMethods[] = [];
  public purchaseOrderSelected: PurchaseOrder[] = [];
  public ditailOrder: DetailPurchaseOrder[] = [];



  purchaseForm: FormGroup = this.fb.group({
    orderNumber: ['', Validators.required],
    orderDate: ['', Validators.required],
    deliveryDate: ['', Validators.required],
    invoiceSerie: ['', Validators.required],
    invoiceDocument: ['', Validators.required],
    paymentMethodId: ['', Validators.required],
    applied: [false, Validators.required],
    totalPurchase: [, Validators.required],
    turn: ['', Validators.required],
    vehicleId: ['', Validators.required],
    storeId: ['', Validators.required],
    purchaseOrderId: ['', Validators.required],
    fuelId: ['', Validators.required],
    amount: ['', Validators.required],
    idp: ['', Validators.required],
    total: ['', Validators.required],
    fuelTankId : ['', Validators.required],
    inventoryCode : ['', Validators.required],

  })
  constructor(
    private fb: FormBuilder,
    private _purchaseService: PurchasesService,
    private _fuelInventoryService : FuelInventoryService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPaymentMethdos();
   
   
   
  }

  findOrder() {
    this._purchaseService.getInfoPurchaseOrder(this.purchaseForm.value)
      .subscribe((infoPurchaseOrder) => {
        this.purchaseForm.controls['vehicleId'].setValue(infoPurchaseOrder.infoPurchaseOrder.vehicleId.vehicleName);
        this.purchaseForm.controls['orderDate'].setValue(infoPurchaseOrder.infoPurchaseOrder.orderDate);
        this.purchaseForm.controls['deliveryDate'].setValue(infoPurchaseOrder.infoPurchaseOrder.deliveryDate);
        this.purchaseForm.controls['storeId'].setValue(infoPurchaseOrder.infoPurchaseOrder.storeId.storeName);
        this.purchaseForm.controls['totalPurchase'].setValue(infoPurchaseOrder.infoPurchaseOrder.totalPurchaseOrder);
        this.getPurchaseOrderId();
        
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.getPurchaseOrderId();
          this.getdetailPurchaseOderInfo();
         
          console.log(this.purchaseForm.value);
         
        })
       
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  };

  getPaymentMethdos() {
    this._purchaseService.getPaymentMethods()
      .subscribe(({ paymentMethod }) => {
        this.paymentMethodSelected = paymentMethod;

      })
  }

  getdetailPurchaseOderInfo() {
    this._purchaseService.getDetailPurchaseOrder(this.purchaseForm.value)
      .subscribe(({ detailPurchaseOderInfo }) => {
        this.ditailOrder = detailPurchaseOderInfo
        console.log(detailPurchaseOderInfo)
        
      });
  };

  getPurchaseOrderId() {
    this._purchaseService.getPurchaseOrderId(this.purchaseForm.value)
      .subscribe(({ purchaseOrderId }) => {
        this.purchaseForm.controls['purchaseOrderId'].setValue(purchaseOrderId.purchaseOrderId);
      });
  };

  getfuelIdRegular() {
    this._fuelInventoryService.getFuelIdRegular()
      .subscribe(({fuelIdRegular}) => {
        this.purchaseForm.controls['fuelId'].setValue(fuelIdRegular.fuelId);
      });
  };

  getfuelIdSuper() {
    this._fuelInventoryService.getFuelIdSuper()
      .subscribe(({fuelIdSuper}) => {
        this.purchaseForm.controls['fuelId'].setValue(fuelIdSuper.fuelId);
      });
  };

  getfuelIdDiesel() {
    this._fuelInventoryService.getFuelIdDiesel()
      .subscribe(({fuelIdDiesel}) => {
        this.purchaseForm.controls['fuelId'].setValue(fuelIdDiesel.fuelId);
      });
  };

  getinventoryCode(){
    this._fuelInventoryService.getinventoryCode(this.purchaseForm.value)
      .subscribe(({inventoryCode}) => {
        this.purchaseForm.controls['inventoryCode'].setValue(inventoryCode.inventoryCode);
      })
  }

  savePurchase(){
    this._purchaseService.createPurchase(this.purchaseForm.value)
      .subscribe((data) => {
        Swal.fire({
          title: "Creado Exitoso!",
          text: "Factura Guardada",
          timer:1000
        })
      }, err=> {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }
  

};
