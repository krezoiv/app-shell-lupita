import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { taxesByFuel } from 'src/app/interfaces/fuelstation/fuels.interface';
import { TaxesId_I } from 'src/app/interfaces/infrastructure.interface';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Store } from 'src/app/models/persons/store.model';
import { Vehicle } from 'src/app/models/persons/vehicle.model';
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

  idpRegular! : Number | any
  idpSuper! : Number | any
  idpDiesel! : Number | any
  public storeSelected: Store[] = [];
  public vehicleSelected: Vehicle[] = [];
  public fuelSelected: Fuels[] = [];
  public fuelSelected2: Fuels[] = [];
  public taxesSelected: TaxesId_I[] = [];

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
    this.getTaxesRegular();
    this.getTaxesSuper();



    /*this.orderForm.get('fuelId')?.valueChanges
      .subscribe(fuels => {
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          console.log(fuels)
          this._fuelService.getIdpFuels(this.orderForm.value)
            .subscribe(({fuels}) => {
              this.orderForm.controls['taxesId'].setValue(fuels.taxesId?.idpAmount);
              console.log(fuels.taxesId?.idpAmount)
              console.log(this.orderForm.value)
            })
        })
      })*/
     /*this.orderForm.get('fuelId')?.valueChanges
      .subscribe(fuels => {
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          console.log(fuels)
          this._fuelService.getIdpFuels(this.orderForm.value)
            .subscribe(({fuels})  => {
              this.idpRegular = fuels.taxesId?.idpAmount
             console.log(fuels.taxesId?.idpAmount)
             this.orderForm.controls['taxesId'].setValue(fuels.taxesId?.idpAmount);
              console.log(this.orderForm.value)
            })
        })
      })*/

      /*this.orderForm.get('fuelId')?.valueChanges
      .subscribe(fuels => {
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          console.log(fuels)
          this._fuelService.getIdpFuels(this.orderForm.value)
            .subscribe(({fuels})  => {
              this.idpSuper = fuels.taxesId?.idpAmount
             console.log(fuels.taxesId?.idpAmount)
             this.orderForm.controls['taxesId'].setValue(fuels.taxesId?.idpAmount);
              console.log(this.orderForm.value)
            })
        })
      })*/
      
         
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

  getTaxesRegular(){
    this.orderForm.reset();
    this.orderForm.get('fuelId')?.valueChanges
      .subscribe(fuels => {
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          console.log(fuels)
          this._fuelService.getIdpFuels(this.orderForm.value)
            .subscribe(({fuels})  => {
              this.idpRegular = fuels.taxesId?.idpAmount
             console.log(fuels.taxesId?.idpAmount)
             this.orderForm.controls['taxesId'].setValue(fuels.taxesId?.idpAmount);
              console.log(this.orderForm.value)
            })
        })
      })
  }

  
  getTaxesSuper(){
    this.orderForm.reset();
    this.orderForm.get('fuelId')?.valueChanges
      .subscribe(fuels => {
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          console.log(fuels)
          this._fuelService.getIdpFuels(this.orderForm.value)
            .subscribe(({fuels})  => {
              this.idpSuper = fuels.taxesId?.idpAmount
             console.log(fuels.taxesId?.idpAmount)
             this.orderForm.controls['taxesId'].setValue(fuels.taxesId?.idpAmount);
              console.log(this.orderForm.value)
            })
        })
      })
  }

  createPurchaseOrder() {
    this._purchaseOrderService.createPurchaseOrder(this.orderForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Numeracíon registrada Correctamente`, 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }


  aperturaOrden() {
    this.createPurchaseOrder();
  }
}
