import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from 'src/app/models/persons/store.model';
import { Vehicle } from 'src/app/models/persons/vehicle.model';
import { StoreService } from 'src/app/services/persons/store.service';
import { VehicleService } from 'src/app/services/persons/vehicle.service';
import { PurchasesService } from 'src/app/services/purchase/purchases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchases-order',
  templateUrl: './purchases-order.component.html',
  styleUrls: ['./purchases-order.component.css']
})
export class PurchasesOrderComponent implements OnInit {

  public storeSelected : Store[] =[];
  public vehicleSelected : Vehicle[] =[];

  orderForm : FormGroup = this.fb.group({
    orderNumber: ['', Validators.required],
    orderDate : ['', Validators.required],
    deliveryDate  : ['', Validators.required],
    total : ['0', Validators.required],
    storeId : ['', Validators.required],
    vehicleId : ['', Validators.required],
    userId  : ['', Validators.required],
    applied  : [false, Validators.required],
    turn : ['', Validators.required],
  });

  constructor(
    private fb : FormBuilder,
    private _storeService : StoreService,
    private _vehicleService : VehicleService,
    private _purchaseOrderService : PurchasesService,
  ) { }

  ngOnInit(): void {
    this.getStore();
    this.getVehicle();
  }

  getStore(){
    this._storeService.getStores()
      .subscribe(({store}) => {
        this.storeSelected = store;
      
      });
  };

  getVehicle(){
    this._vehicleService.getVehicle()
      .subscribe(({vehicle}) => {
        this.vehicleSelected = vehicle;
      });
  };

  createPurchaseOrder(){
    this._purchaseOrderService.createPurchaseOrder(this.orderForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Numeracíon registrada Correctamente`, 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }


  aperturaOrden(){
    this.createPurchaseOrder();
  }
}
