import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
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

  idp!: Number | any;
  amountDetail !: Number | any;
  priceDetail!: Number | any;
  totalDetail!: Number | any;
  idpTotal!: Number | any;
  idpDetail!: Number | any;
  purchaseTotal!: Number | any;
  totalPurchaseDB!: Number | any;
  tlTotal!: Number | any;
  tlToUpdate!: Number | any;

  buttonDisableNewOrderDetail: boolean = false;
  buttonDisableOrderDetail: boolean = false;
  buttonDisableSaveAll: boolean = false;
  buttonDisableApertura: boolean = true;


  public storeSelected: Store[] = [];
  public vehicleSelected: Vehicle[] = [];
  public fuelSelected: Fuels[] = [];
  public fuelSelected2: Fuels[] = [];
  public taxesSelected: TaxesId_I[] = [];
  public PurchaseDetOrder: DetailPurchaseOrder[] = [];
  public totaPurchases: DetailPurchaseOrder[] = [];

  orderForm: FormGroup = this.fb.group({
    orderNumber: ['', Validators.required],
    orderDate: ['', Validators.required],
    deliveryDate: ['', Validators.required],
    total: [0, Validators.required],
    storeId: ['', Validators.required],
    vehicleId: ['', Validators.required],
    userId: ['', Validators.required],
    applied: [false, Validators.required],
    turn: ['', Validators.required],
    fuelId: ['', Validators.required],
    taxesId: ['', Validators.required],
    amount: ['', Validators.required],
    price: ['', Validators.required],
    purchaseOrderId: ['', Validators.required],
    idpTotal: [0, Validators.required],
    aplicado: [false, Validators.required],
    tl: [0, Validators.required],
    totalPurchaseOrder: [0, Validators.required],


  });

  constructor(
    private fb: FormBuilder,
    private _storeService: StoreService,
    private _vehicleService: VehicleService,
    private _purchaseOrderService: PurchasesService,
    private _fuelService: FuelsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.getStore();
    this.getVehicle();
    this.getFuels();
    this.getTotalDetailPurchaseOrder();
    this.getTotalPurchaseOrder();

    this.getTaxes();

    this.suscription = this._purchaseOrderService.refresh$.subscribe(() => {
      this.listDetailPurchaseOrder();
    })

  }

  getListPurchaseDetailOrder() {

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

  getTaxes() {

    this.orderForm.get('fuelId')?.valueChanges
      .subscribe(fuels => {
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {

          this._fuelService.getIdpFuels(this.orderForm.value)
            .subscribe(({ fuels }) => {
              this.idp = fuels.taxesId?.idpAmount

              this.orderForm.controls['taxesId'].setValue(fuels.taxesId?.idpAmount);


            })
        })
      })
  }



  getTotalDetailPurchaseOrder() {
    this._purchaseOrderService.getTotalPurchase()
      .subscribe(({ totalDetailPurchaseOrder }) => {
        this.totaPurchases = totalDetailPurchaseOrder
      })


  }

  getPurchaseOrderId() {
    this._purchaseOrderService.getPurchaseOrderId(this.orderForm.value)
      .subscribe(({ purchaseOrder }) => {
        this.orderForm.controls['purchaseOrderId'].setValue(purchaseOrder.purchaseOrderId);

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

  creatDetailPurchaseOrder() {
    this._purchaseOrderService.createDetailOrder(this.orderForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Numeracíon registrada Correctamente`, 'success');

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  }


  aperturaOrden() {

    if (this.orderForm.get('orderDate')?.value == "" || this.orderForm.get('deliveryDate')?.value == ""
      || this.orderForm.get('storeId')?.value == "" || this.orderForm.get('vehicleId')?.value == ""
      || this.orderForm.get('orderNumber')?.value == "" || this.orderForm.get('turn')?.value == ""
    ) {
      Swal.fire('Error', `Campos vacios`, 'error');
      return;
    }
    this.createPurchaseOrder();
    const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getPurchaseOrderId();

      this.buttonDisableOrderDetail = true;
      this.buttonDisableApertura = false;

    })

  }

  saveOrderDetail() {

    const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getTotalDetail();
      this.creatDetailPurchaseOrder();
      this.getTotalDetailPurchaseOrder();
      this.listDetailPurchaseOrder();
      this.buttonDisableNewOrderDetail = true;
      this.buttonDisableOrderDetail = false;
      this.getTotalPurchaseOrder();
      this.calculateOrdersTotal();
      this.updateTotalPurchaseOrder();   
      this.buttonDisableSaveAll= true;

    });

  };

  newOrderDetail() {
    this.resetDetailOrderValues();
    this.buttonDisableNewOrderDetail = false;
    this.buttonDisableOrderDetail = true;


  }

  getTotalDetail() {
    this.amountDetail = this.orderForm.get('amount')?.value;
    this.priceDetail = this.orderForm.get('price')?.value;
    this.idpDetail = this.orderForm.get('taxesId')?.value;
    this.idpTotal = this.amountDetail * this.idpDetail;
    this.orderForm.controls['idpTotal'].setValue(this.idpTotal)
    this.totalDetail = (this.amountDetail * this.priceDetail) + this.idpTotal;
    this.orderForm.controls['total'].setValue(this.totalDetail);
  }

  calculateOrdersTotal() {
    this.totalPurchaseDB = this.orderForm.get('total')?.value;
    this.tlTotal = this.orderForm.get('totalPurchaseOrder')?.value;
    this.tlToUpdate = this.totalPurchaseDB + this.tlTotal
    this.orderForm.controls['totalPurchaseOrder'].setValue(this.tlToUpdate);
    console.log(this.tlToUpdate)
  }

  listDetailPurchaseOrder() {
    this._purchaseOrderService.getListPurchaseDetailOrder(this.orderForm.value)
      .subscribe(({ listPurchaseOrder }) => {
        this.PurchaseDetOrder = listPurchaseOrder

      })
  };

  updateAplicarDetailOrder() {
    this._purchaseOrderService.uptdateAplicarDetailOrder()
      .subscribe(data => {

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  };

  saveOrder() {
    this.updateAplicarDetailOrder();
    this.reload();
  }

  reload() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard/compras/ordenPedido']);
    });
  }


  resetDetailOrderValues() {
    this.orderForm.controls['fuelId'].setValue('');
    this.orderForm.controls['taxesId'].setValue('');
    this.orderForm.controls['amount'].setValue('');
    this.orderForm.controls['price'].setValue('');
    this.orderForm.controls['total'].setValue('');
  }

  updateTotalPurchaseOrder() {
    const data = {
      ...this.orderForm.value
    };
    this._purchaseOrderService.updateTotalPurchaseOrder(data)
      .subscribe(resp => {

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };

  getTotalPurchaseOrder() {
    const data = {
      ...this.orderForm.value
    };
    this._purchaseOrderService.getTotalPurchaseOrder(data)
      .subscribe(resp => {

      })
  }

}
