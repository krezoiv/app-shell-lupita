import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Applied_I, Banks_I } from 'src/app/interfaces/users.interface';
import { Fuels } from 'src/app/models/infrastructure.model';
import { PaymentMethods } from 'src/app/models/purchase/paymentMethods.models';
import { DetailPurchaseOrder, PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { AuthService } from 'src/app/services/auth.service';
import { FuelInventoryService } from 'src/app/services/fuelstation/fuel-inventory.service';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';
import { PurchasesService } from 'src/app/services/purchase/purchases.service';
import { PurchasesReportingService } from 'src/app/services/reporting/purchases-reporting.service';
import { LoadingComponent } from 'src/app/shared/functions/loading/loading.component';
import { TimerComponent } from 'src/app/shared/functions/timer/timer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-applied-purchase',
  templateUrl: './applied-purchase.component.html',
  styleUrls: ['./applied-purchase.component.css']
})
export class AppliedPurchaseComponent implements OnInit {

  btnSave: boolean = false;
  btnsaveSuper: boolean = false;
  btnsaveRegular: boolean = false;
  btnsaveDiesel: boolean = false;
  btnLoad: boolean = false;
  dt!: string | any

  banks: Banks_I[] = [
    { bankId: 'bam', bankName: 'Banco Agomercantil' },
    { bankId: 'bac', bankName: 'Banco de América Central' },
    { bankId: 'banrural', bankName: 'Banco de Desarrollo Rural' },
    { bankId: 'gyt', bankName: 'Banco de G&T' },
    { bankId: 'coope', bankName: 'Cooperativa Guayacan' },
  ];

  applied: Applied_I[] = [
    { appliedId: 'pagada', appliedName: 'pagada' },
    { appliedId: 'pendiente', appliedName: 'pendiente' },
  ]
  purchaseReporting: PurchaseOrder[] = [];
  fuels: Fuels[] = [];
  reportingPurchaseForm: FormGroup = this.fb.group({
    orderNumber: []
  })


  availableDB!: Number | any;
  newAvailable!: Number | any;
  amountPendingDB !: Number | any;
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
    appliedId: [false, Validators.required],
    totalPurchase: [, Validators.required],
    turn: ['', Validators.required],
    vehicleId: ['', Validators.required],
    storeId: ['', Validators.required],
    purchaseOrderId: ['', Validators.required],
    fuelId: ['', Validators.required],
    amount: ['', Validators.required],
    idp: ['', Validators.required],
    total: ['', Validators.required],
    fuelTankId: ['', Validators.required],
    inventoryCode: ['', Validators.required],
    amountPending: ['', Validators.required],
    available: ['', Validators.required],
    bankId: [''],
    NoBankCheck: [''],
    checkAmount: ['0'],
    couponsAmount: ['0'],
    otherPaymentDescription: ['no aplica'],
    otherPayment: ['0'],
    purchaseId: [''],
    userName: [],
    expirationDate: []
  })
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _purchaseService: PurchasesService,
    private _fuelInventoryService: FuelInventoryService,
    private _snackBar: MatSnackBar,
    private _authService: AuthService

  ) { }

  ngOnInit(): void {
    this.getPaymentMethdos();
  }

  updateIdPurchase() {
    this._purchaseService.updateIdPurchase(this.purchaseForm.value)
      .subscribe(data => {


      })
  }


  findOrder() {
    this._purchaseService.getInfoPurchaseOrder(this.purchaseForm.value)
      .subscribe((infoPurchaseOrder) => {
        this.purchaseForm.controls['vehicleId'].setValue(infoPurchaseOrder.infoPurchaseOrder.vehicleId.vehicleName);
        this.purchaseForm.controls['orderDate'].setValue(infoPurchaseOrder.infoPurchaseOrder.orderDate);
        this.purchaseForm.controls['deliveryDate'].setValue(infoPurchaseOrder.infoPurchaseOrder.deliveryDate);
        this.purchaseForm.controls['storeId'].setValue(infoPurchaseOrder.infoPurchaseOrder.storeId.storeName);
        this.purchaseForm.controls['totalPurchase'].setValue(infoPurchaseOrder.infoPurchaseOrder.totalPurchaseOrder);
        this.purchaseForm.controls['invoiceSerie'].setValue(infoPurchaseOrder.infoPurchaseOrder.purchaseId.invoiceSerie);
        this.purchaseForm.controls['invoiceDocument'].setValue(infoPurchaseOrder.infoPurchaseOrder.purchaseId.invoiceDocument);
        this.purchaseForm.controls['expirationDate'].setValue(infoPurchaseOrder.infoPurchaseOrder.purchaseId.expirationDate);
        this.purchaseForm.controls['orderNumber'].setValue(infoPurchaseOrder.infoPurchaseOrder.purchaseId.orderNumber);
        const dt = (this.purchaseForm.get('expirationDate')?.value);
        const dt2 = (dt.slice(0, -1))
        const dt3 = new Date(dt2).toLocaleDateString()
        this.purchaseForm.controls['expirationDate'].setValue(dt3);
        const dateOrder = (this.purchaseForm.get('orderDate')?.value);
        const dateOrder2 = (dateOrder.slice(0, -1));
        const dateOrder3 = new Date(dateOrder2).toLocaleDateString()
        this.purchaseForm.controls['orderDate'].setValue(dateOrder3);
        const dateDelivery = (this.purchaseForm.get('deliveryDate')?.value);
        const dateDelivery2 = (dateDelivery.slice(0, -1));
        const dateDelivery3 = new Date(dateDelivery2).toLocaleDateString()
        this.purchaseForm.controls['deliveryDate'].setValue(dateDelivery3);

        this.getPurchaseOrderId();
        this.getPurchaseOrderId();
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 1 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.getPurchaseOrderId();
          this.getdetailPurchaseOderInfo();
          this.btnLoad = true

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


      });
  };

  getPurchaseOrderId() {
    this._purchaseService.getPurchaseOrderId(this.purchaseForm.value)
      .subscribe(({ purchaseOrderId }) => {
        this.purchaseForm.controls['purchaseOrderId'].setValue(purchaseOrderId.purchaseOrderId);
      });
  };



  getIdPurchase() {
    this._purchaseService.getPurchaseId(this.purchaseForm.value)
      .subscribe(({ getIdPurchase }) => {
        this.purchaseForm.controls['purchaseId'].setValue(getIdPurchase.purchaseId);

      })
  }

  getfuelIdRegular() {
    this._fuelInventoryService.getFuelIdRegular()
      .subscribe(({ fuelIdRegular }) => {
        this.purchaseForm.controls['fuelId'].setValue(fuelIdRegular.fuelId);
      });
  };

  getfuelIdSuper() {
    this._fuelInventoryService.getFuelIdSuper()
      .subscribe(({ fuelIdSuper }) => {
        this.purchaseForm.controls['fuelId'].setValue(fuelIdSuper.fuelId);
      });
  };

  getfuelIdDiesel() {
    this._fuelInventoryService.getFuelIdDiesel()
      .subscribe(({ fuelIdDiesel }) => {
        this.purchaseForm.controls['fuelId'].setValue(fuelIdDiesel.fuelId);
      });
  };

  getinventoryCode() {
    this._fuelInventoryService.getinventoryCode(this.purchaseForm.value)
      .subscribe(({ inventoryCode }) => {
        this.purchaseForm.controls['inventoryCode'].setValue(inventoryCode.inventoryCode);

      });
  };

  getAmountPending() {
    this._fuelInventoryService.getAmountPending(this.purchaseForm.value)
      .subscribe(({ fuelInventoryAmountPending }) => {
        this.purchaseForm.controls['amountPending'].setValue(fuelInventoryAmountPending.amountPending);

      });
  };

  getAvailable() {
    this._fuelInventoryService.getFuelInventoryAvailable(this.purchaseForm.value)
      .subscribe(({ fuelInventoryAvailable }) => {
        this.purchaseForm.controls['available'].setValue(fuelInventoryAvailable.available);

      });
  };






  savePurchase() {

    this._purchaseService.createPurchase(this.purchaseForm.value)
      .subscribe((data) => {
        this.getIdPurchase();
        const snackBarRef = this._snackBar.openFromComponent(LoadingComponent, { duration: 500 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.getIdPurchase();
          this.updateIdPurchase();
          this.getIdPurchase();
        })
        this.reload();
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })


  };

  releaseFunction() {
    this.availableDB = this.purchaseForm.get('available')?.value;
    this.amountPendingDB = this.purchaseForm.get('amountPending')?.value;
    this.newAvailable = (this.availableDB + this.amountPendingDB);
    this.purchaseForm.controls['available'].setValue(this.newAvailable);

  }

  resetDetailOrderValues() {
    this.purchaseForm.controls['fuelId'].setValue('');
    this.purchaseForm.controls['inventoryCode'].setValue('');
    this.purchaseForm.controls['amountPending'].setValue('');
    this.purchaseForm.controls['amount'].setValue('');

  }

  //reload page
  reload() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard/compras/generar-factura']);
    });
  };

  loadFuels() {
    this.btnsaveSuper = true;
    this.btnLoad = false;
  }

  appliedPurchase() {
    Swal.fire({
      title: 'Desea Modificar Factura?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._purchaseService.apliedPurchase(this.purchaseForm.value)
          .subscribe(data => {

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Factura modificada',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigateByUrl('/dashboard');
          }, error => {
            Swal.fire('Error', error.error.msg, 'error')
          })
      } else if (result.isDenied) {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'Proceso Cancelado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }
}
