import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaxesId_I } from 'src/app/interfaces/infrastructure.interface';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Store } from 'src/app/models/persons/store.model';
import { Vehicle } from 'src/app/models/persons/vehicle.model';
import { DetailPurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { FuelInventoryService } from 'src/app/services/fuelstation/fuel-inventory.service';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';
import { StoreService } from 'src/app/services/persons/store.service';
import { VehicleService } from 'src/app/services/persons/vehicle.service';
import { PurchasesService } from 'src/app/services/purchase/purchases.service';
import { TimerComponent } from 'src/app/shared/functions/timer/timer.component';
import Swal from 'sweetalert2';
import { __values } from 'tslib';
import { FuelInventory } from 'src/app/models/fuelstation/fuelInventory.model';

@Component({
  selector: 'app-purchases-order',
  templateUrl: './purchases-order.component.html',
  styleUrls: ['./purchases-order.component.css']
})
export class PurchasesOrderComponent implements OnInit {

  suscription!: Subscription;
  suscription2!: Subscription;
  hide: boolean = false

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
  purchaseIDOTotal!: Number | any;
  totalIDPPurchaseDB!: Number | any;
  tlIDPTotal!: Number | any;
  tlIDPToUpdate!: Number | any;
  subtotalIDP!: Number | any;
  subtotalPurchase!: Number | any;
  SB!: Number | any;
  amountPendingDB!: Number | any;
  newAmount!: | any;
  buttonDisableNewOrderDetail: boolean = false;
  buttonDisableOrderDetailSuper: boolean = false;
  buttonDisableOrderDetailRegular: boolean = false;
  buttonDisableOrderDetailDiesel: boolean = false;
  buttonDisableSaveAll: boolean = false;
  buttonDisableApertura: boolean = true;
  hideSection:boolean = false


  public fuelSuper : FuelInventory[] =[];
  public fuelRegular : FuelInventory[] =[];
  public fuelDiesel : FuelInventory[] =[];
  public storeSelected: Store[] = [];
  public vehicleSelected: Vehicle[] = [];
  public fuelSelected: Fuels[] = [];
  public fuelSelected2: Fuels[] = [];
  public taxesSelected: TaxesId_I[] = [];
  public PurchaseDetOrder: DetailPurchaseOrder[] = [];
  public totaPurchases: DetailPurchaseOrder[] = [];
  public totaIDPPurchases: DetailPurchaseOrder[] = [];

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
    totalIDPPurchaseOrder: [0, Validators.required],
    subtotal: [0, Validators.required],
    fuelTankId: ['', Validators.required],
    fuelInventoryId: ['', Validators.required],
    amountPending: [0, Validators.required],
    totalGallonSuper: [0],
    totalGallonRegular: [0],
    totalGallonDiesel: [0],
  });

  constructor(
    private fb: FormBuilder,
    private _storeService: StoreService,
    private _vehicleService: VehicleService,
    private _purchaseOrderService: PurchasesService,
    private _fuelService: FuelsService,
    private _fuelInventoryService: FuelInventoryService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.getStore();
    this.getVehicle();
    this.getFuels();
    this.getfuelIdSuper();
    this.getfuelIdRegular();
    this.getfuelIdDiesel();
    this.getTotalDetailPurchaseOrder();
    this.getTotalIDPDetailPurchaseOrder();
    this.getTotalPurchaseOrder();
    this.getTaxes();
    this.suscription = this._purchaseOrderService.refresh$.subscribe(() => {
      this.listDetailPurchaseOrder();
    });
  };

  getListPurchaseDetailOrder() { }

  ngOnDestroy(): void { this.suscription.unsubscribe(); };

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
              console.log(fuels)
            });
        });
      });
  };


  getfuelIdSuper() {
    this._fuelInventoryService.getFuelSuperByCode()
      .subscribe(({fuelIdSuper}) => {
        this.fuelSuper = fuelIdSuper
        console.log(fuelIdSuper)
        
      })
  };            

  getfuelIdRegular() {
    this._fuelInventoryService.getFuelRegularByCode()
      .subscribe(({fuelIdRegular}) => {
        this.fuelRegular = fuelIdRegular 
      })
  };

  getfuelIdDiesel() {
    this._fuelInventoryService.getFuelDieselByCode()
    .subscribe(({fuelIdDiesel}) => {
      this.fuelDiesel = fuelIdDiesel 
    })
     
  };


  getTotalDetailPurchaseOrder() {
    this._purchaseOrderService.getTotalPurchase()
      .subscribe(({ totalDetailPurchaseOrder }) => {
        this.totaPurchases = totalDetailPurchaseOrder
      });
  };

  getTotalIDPDetailPurchaseOrder() {
    this._purchaseOrderService.getTotalIDPPurchase()
      .subscribe(({ totalDetailIDPPurchaseOrder }) => {
        this.totaIDPPurchases = totalDetailIDPPurchaseOrder
      });
  };


  getPurchaseOrderId() {
    this._purchaseOrderService.getPurchaseOrderId(this.orderForm.value)
      .subscribe(({ purchaseOrderId }) => {
        this.orderForm.controls['purchaseOrderId'].setValue(purchaseOrderId.purchaseOrderId);
      });
  };

  /**
 * *get fuel inventory id 
 */
  getFuelInventoryId() {
    const data = {
      ...this.orderForm.value
    };

    this._fuelInventoryService.getFuelInventoryId(data)
      .subscribe(({ fuelInventoryId }) => {
        this.orderForm.controls['fuelInventoryId'].setValue(fuelInventoryId.fuelInventoryId);
      });
  };


  /**
  ** get amount pending on fuel inventory
  */
  getAmountPending() {
    const data = {
      ...this.orderForm.value
    };

    this._fuelInventoryService.getFuelInventoryAmountPending(data)
      .subscribe(({ fuelInventoryAmountPending }) => {
        this.orderForm.controls['amountPending'].setValue(fuelInventoryAmountPending.amountPending);
      });
  };

  /**
  ** Method that is responsible for creating a purchase order   
  ** Metodo que se encarga de crear orden de comra
  */
  createPurchaseOrder() {
    this._purchaseOrderService.createPurchaseOrder(this.orderForm.value)
      .subscribe((data) => {
        Swal.fire({
          title: "Creado Exitoso!",
          text: "Orden Generada",
          timer: 1000
        })

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  creatDetailPurchaseOrder() {
    this._purchaseOrderService.createDetailOrder(this.orderForm.value)
      .subscribe((data) => {
        Swal.fire({
          title: "Almacenado!",
          text: "Detalle Agreda a la Orden",
          timer: 1000
        })
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };


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
      this.buttonDisableOrderDetailRegular = true;
      this.buttonDisableOrderDetailSuper = true;
      this.buttonDisableOrderDetailDiesel= true
      this.buttonDisableApertura = false;
    });
  };

  saveOrderDetailSuper() {

    const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getTotalDetail();
      this.creatDetailPurchaseOrder();
      this.getTotalDetailPurchaseOrder();
      this.getTotalIDPDetailPurchaseOrder();
      this.calculateOrdersTotal();
      this.getTotalPurchaseOrder();
      this.getFuelInventoryId();
      const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
      snackBarRef.afterDismissed().subscribe(() => {
        this.getAmountPending();
        this.getTotalDetailPurchaseOrder();
        this.getTotalIDPDetailPurchaseOrder();
        this.listDetailPurchaseOrder();
        this.sumAmountPendingAndAmountOrder();
        this.updateAmountPending();
        this.buttonDisableNewOrderDetail = true;
        this.buttonDisableOrderDetailSuper = false;
        this.getTotalPurchaseOrder();   
        this.buttonDisableSaveAll = true;
        this.newAmount = this.orderForm.get('amount')?.value;
        this.orderForm.controls['totalGallonSuper'].setValue(this.newAmount);
        this.clearInputs();
        
      });
    });
  };

  saveOrderDetailRegular() {

    const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getTotalDetail();
      this.creatDetailPurchaseOrder();
      this.getTotalDetailPurchaseOrder();
      this.getTotalIDPDetailPurchaseOrder();
      this.calculateOrdersTotal();
      this.getTotalPurchaseOrder();
      this.getFuelInventoryId();
      const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
      snackBarRef.afterDismissed().subscribe(() => {
        this.getAmountPending();
        this.getTotalDetailPurchaseOrder();
        this.getTotalIDPDetailPurchaseOrder();
        this.listDetailPurchaseOrder();
        this.sumAmountPendingAndAmountOrder();
        this.updateAmountPending();
        this.buttonDisableNewOrderDetail = true;
        this.buttonDisableOrderDetailRegular = false;
        this.getTotalPurchaseOrder();
        this.buttonDisableSaveAll = true;
        this.newAmount = this.orderForm.get('amount')?.value;
        this.orderForm.controls['totalGallonRegular'].setValue(this.newAmount);
        this.clearInputs(); 
      });
    });
  };


  saveOrderDetailDiesel() {

    const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getTotalDetail();
      this.creatDetailPurchaseOrder();
      this.getTotalDetailPurchaseOrder();
      this.getTotalIDPDetailPurchaseOrder();
      this.calculateOrdersTotal();
      this.getTotalPurchaseOrder();
      this.getFuelInventoryId();
      const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
      snackBarRef.afterDismissed().subscribe(() => {
        this.getAmountPending();
        this.getTotalDetailPurchaseOrder();
        this.getTotalIDPDetailPurchaseOrder();
        this.listDetailPurchaseOrder();
        this.sumAmountPendingAndAmountOrder();
        this.updateAmountPending();
        this.buttonDisableNewOrderDetail = true;
        this.buttonDisableOrderDetailDiesel = false;
        this.getTotalPurchaseOrder();
        this.buttonDisableSaveAll = true;
        this.newAmount = this.orderForm.get('amount')?.value;
        this.orderForm.controls['totalGallonDiesel'].setValue(this.newAmount);
        this.clearInputs();
      });
    });
  };

  newOrderDetail() {
    this.resetDetailOrderValues();
    this.buttonDisableNewOrderDetail = false;
    this.buttonDisableOrderDetailRegular = true;
  };

  getTotalDetail() {
    this.amountDetail = this.orderForm.get('amount')?.value;
    this.priceDetail = this.orderForm.get('price')?.value;
    this.idpDetail = this.orderForm.get('taxesId')?.value;
    this.idpTotal = this.amountDetail * this.idpDetail;
    this.orderForm.controls['idpTotal'].setValue(this.idpTotal);
    this.totalDetail = (this.amountDetail * this.priceDetail) + this.idpTotal;
    this.orderForm.controls['total'].setValue(this.totalDetail);
  };

  calculateOrdersTotal() {
    this.totalPurchaseDB = this.orderForm.get('total')?.value;
    this.tlTotal = this.orderForm.get('totalPurchaseOrder')?.value;
    this.totalIDPPurchaseDB = this.orderForm.get('idpTotal')?.value;
    this.tlIDPTotal = this.orderForm.get('totalIDPPurchaseOrder')?.value;
    this.tlToUpdate = this.totalPurchaseDB + this.tlTotal;
    this.tlIDPToUpdate = this.totalIDPPurchaseDB + this.tlIDPTotal;
    this.orderForm.controls['totalPurchaseOrder'].setValue(this.tlToUpdate);
    this.orderForm.controls['totalIDPPurchaseOrder'].setValue(this.tlIDPToUpdate);
    const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.subtotalPurchase = this.orderForm.get('totalPurchaseOrder')?.value;
      this.subtotalIDP = this.orderForm.get('totalIDPPurchaseOrder')?.value;
      this.SB = this.subtotalPurchase - this.subtotalIDP;
      this.orderForm.controls['subtotal'].setValue(this.SB);

    });
  };

  /**
   ** sum of amount pending of inventory and amount of order
   */
  sumAmountPendingAndAmountOrder() {
    this.amountPendingDB = this.orderForm.get('amountPending')?.value;
    this.amountDetail = this.orderForm.get('amount')?.value;
    this.newAmount = (this.amountPendingDB + this.amountDetail);
    this.orderForm.controls['amountPending'].setValue(this.newAmount);
  };

  listDetailPurchaseOrder() {
    this._purchaseOrderService.getListPurchaseDetailOrder(this.orderForm.value)
      .subscribe(({ listPurchaseOrder }) => {
        this.PurchaseDetOrder = listPurchaseOrder
      });
  };

  updateAplicarDetailOrder() {
    this._purchaseOrderService.uptdateAplicarDetailOrder()
      .subscribe(data => {

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  updateAmountPending() {
    const data = {
      ...this.orderForm.value
    };
    this._fuelInventoryService.updateAmountPending(data)
      .subscribe(data => {

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };


  saveOrder() {

   this.updateTotalPurchaseOrder();
   this.updateAplicarDetailOrder();
    this.reload();
  };

  reload() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard/compras/orden-de-pedido']);
    });
  };


  resetDetailOrderValues() {
    this.orderForm.controls['fuelId'].setValue('');
    this.orderForm.controls['taxesId'].setValue('');
    this.orderForm.controls['amount'].setValue('');
    this.orderForm.controls['price'].setValue('');
    this.orderForm.controls['total'].setValue('');
    this.orderForm.controls['amountPending'].setValue('');
  };

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

      });
  };

  clearInputs(){
    this.orderForm.controls['fuelId'].setValue('');
    this.orderForm.controls['taxesId'].setValue('');
    this.orderForm.controls['amount'].setValue(0);
    this.orderForm.controls['price'].setValue(0);
    this.orderForm.controls['total'].setValue(0);
  }
}
