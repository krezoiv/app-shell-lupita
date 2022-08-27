import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleStrategy } from '@angular/router';
import { Subscription } from 'rxjs';
import { taxesByFuel } from 'src/app/interfaces/fuelstation/fuels.interface';
import { PurchaseOrder_I } from 'src/app/interfaces/fuelstation/purchase.interface';
import { TaxesId_I } from 'src/app/interfaces/infrastructure.interface';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Store } from 'src/app/models/persons/store.model';
import { Vehicle } from 'src/app/models/persons/vehicle.model';
import { DetailPurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { Taxes } from 'src/app/models/purchase/taxes.model';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';
import { StoreService } from 'src/app/services/persons/store.service';
import { VehicleService } from 'src/app/services/persons/vehicle.service';
import { PurchasesService } from 'src/app/services/purchase/purchases.service';
import { TimerComponent } from 'src/app/shared/functions/timer/timer.component';
import Swal from 'sweetalert2';
import { __values } from 'tslib';

@Component({
  selector: 'app-purchases-order',
  templateUrl: './purchases-order.component.html',
  styleUrls: ['./purchases-order.component.css']
})
export class PurchasesOrderComponent implements OnInit {

  suscription!: Subscription;
  suscription2!: Subscription;

  idp! : Number | any;
  amountDetail !: Number | any;
  priceDetail! : Number | any;
  totalDetail! : Number | any;
  idpTotal!: Number | any;
  idpDetail! : Number | any;
  public storeSelected: Store[] = [];
  public vehicleSelected: Vehicle[] = [];
  public fuelSelected: Fuels[] = [];
  public fuelSelected2: Fuels[] = [];
  public taxesSelected: TaxesId_I[] = [];
  public PurchaseDetOrder : DetailPurchaseOrder[]=[];

  orderForm: FormGroup = this.fb.group({
    orderNumber: ['', Validators.required],
    orderDate: ['', Validators.required],
    deliveryDate: ['', Validators.required],
    total: ['0', Validators.required],
    storeId: ['', Validators.required],
    vehicleId: ['', Validators.required],
    userId: ['', Validators.required],
    applied: [false, Validators.required],
    turn: ['', Validators.required],
    fuelId: ['', Validators.required],
    taxesId: ['', Validators.required],
    amount: ['', Validators.required],
    price: ['', Validators.required],
    purchaseOrderId : ['', Validators.required],
    idpTotal : [0, Validators.required],
    aplicado: [false, Validators.required],


  });

  constructor(
    private fb: FormBuilder,
    private _storeService: StoreService,
    private _vehicleService: VehicleService,
    private _purchaseOrderService: PurchasesService,
    private _fuelService: FuelsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getStore();
    this.getVehicle();
    this.getFuels();
   
    this.getTaxes();   
    this.listDetailPurchaseOrder();   
    this.suscription = this._purchaseOrderService.refresh$.subscribe(()=> {
      this.listDetailPurchaseOrder();
    })
         
  }

  getListPurchaseDetailOrder(){
   
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();

  }

  getStore() {
    this._storeService.getStores()
      .subscribe(({ store }) => {
        this.storeSelected = store;

      });
  };

  getVehicle() {
    this._vehicleService.getVehicle()
      .subscribe(({ vehicle }) => {
        this.vehicleSelected = vehicle;
      });
  };

  getFuels() {
    this._fuelService.getFuelsActive()
      .subscribe(({ fuels }) => {
        this.fuelSelected = fuels

      });
  };

  getTaxes(){
    
    this.orderForm.get('fuelId')?.valueChanges
      .subscribe(fuels => {
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          console.log(fuels)
          this._fuelService.getIdpFuels(this.orderForm.value)
            .subscribe(({fuels})  => {
              this.idp = fuels.taxesId?.idpAmount
             console.log(fuels.taxesId?.idpAmount)
             this.orderForm.controls['taxesId'].setValue(fuels.taxesId?.idpAmount);
              console.log(this.orderForm.value)
            })
        })
      })
  }
  
  getPurchaseOrderId(){
    this._purchaseOrderService.getPurchaseOrderId(this.orderForm.value)
      .subscribe(({purchaseOrder}) => {
        this.orderForm.controls['purchaseOrderId'].setValue(purchaseOrder.purchaseOrderId);
        console.log(purchaseOrder.purchaseOrderId)
      })
  }


  createPurchaseOrder() {
    this._purchaseOrderService.createPurchaseOrder(this.orderForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Numeracíon registrada Correctamente`, 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  creatDetailPurchaseOrder(){
    this._purchaseOrderService.createDetailOrder(this.orderForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Numeracíon registrada Correctamente`, 'success');
        console.log(this.orderForm.value)
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  }


  aperturaOrden() {
    this.createPurchaseOrder();
    console.log(this.orderForm.value)
    const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getPurchaseOrderId();
    })
   
  }

  saveOrderDetail(){
    this.getTotalDetail();
    this.creatDetailPurchaseOrder();
   
    console.log(this.orderForm.value)
  }

  getTotalDetail(){
    this.amountDetail = this.orderForm.get('amount')?.value;
    this.priceDetail = this.orderForm.get('price')?.value;
    this.idpDetail = this.orderForm.get('taxesId')?.value;
    this.idpTotal = this.amountDetail * this.idpDetail;
    this.orderForm.controls['idpTotal'].setValue(this.idpTotal)
    this.totalDetail = (this.amountDetail * this.priceDetail) + this.idpTotal;
    this.orderForm.controls['total'].setValue(this.totalDetail);
  }

  listDetailPurchaseOrder(){
    this._purchaseOrderService.getListPurchaseDetailOrder(this.orderForm.value)
    .subscribe(({listPurchaseOrder})=> {
      this.PurchaseDetOrder = listPurchaseOrder
      console.log(listPurchaseOrder)
    })
  }

  getTotalDetailPurchaseOrder(){

  }

}
