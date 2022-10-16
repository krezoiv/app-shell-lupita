import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Applied_I, Banks_I } from 'src/app/interfaces/users.interface';
import { PaymentMethods } from 'src/app/models/purchase/paymentMethods.models';
import { DetailPurchaseOrder, PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { AuthService } from 'src/app/services/auth.service';
import { FuelInventoryService } from 'src/app/services/fuelstation/fuel-inventory.service';
import { PurchasesService } from 'src/app/services/purchase/purchases.service';
import { LoadingComponent } from 'src/app/shared/functions/loading/loading.component';
import { TimerComponent } from 'src/app/shared/functions/timer/timer.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  btnSave : boolean = false;
  btnsaveSuper : boolean = false;
  btnsaveRegular : boolean = false;
  btnsaveDiesel : boolean = false;
  btnLoad : boolean = false;

  banks: Banks_I[] = [
    { bankId: 'bam', bankName: 'Banco Agomercantil' },
    { bankId: 'bac', bankName: 'Banco de América Central' },
    { bankId: 'banrural', bankName: 'Banco de Desarrollo Rural' },
    { bankId: 'gyt', bankName: 'Banco de G&T' },
    { bankId: 'coope', bankName: 'Cooperativa Guayacan' },
  ];

  applied : Applied_I[] =[
    { appliedId :'pagada', appliedName:'pagada'},
    { appliedId :'pendiente', appliedName:'pendiente'},
  ]

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
    appliedId: ['', Validators.required],
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

    this.purchaseForm.controls['userName'].setValue(this._authService.usuario.firstName);

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
        const dateOrder =(this.purchaseForm.get('orderDate')?.value);
        const dateOrder2 = (dateOrder.slice(0, -14));
        const dateOrder3 =new Date(dateOrder2).toLocaleDateString('en-GB');
        this.purchaseForm.controls['orderDate'].setValue(dateOrder3);
        const deliveryOrder =(this.purchaseForm.get('deliveryDate')?.value);
        const deliveryOrder2 = (deliveryOrder.slice(0, -14));
        const deliveryOrder3 =new Date(deliveryOrder2).toLocaleDateString('en-GB');
        this.purchaseForm.controls['deliveryDate'].setValue(deliveryOrder3);

        
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

  loadRegulartoTank() {
    this.getfuelIdRegular();


    const snackBarRef = this._snackBar.openFromComponent(LoadingComponent, { duration: 500 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getfuelIdRegular();
      this.getinventoryCode();
      this.getAmountPending();
      this.getAvailable();


      const snackBarRef = this._snackBar.openFromComponent(LoadingComponent, { duration: 500 });
      snackBarRef.afterDismissed().subscribe(() => {
        this.getfuelIdRegular();
        this.getinventoryCode();
        this.getAmountPending();
        this.getAvailable();
        this.releaseFunction();
        this.releaseAmountRegular();
        this.resetDetailOrderValues();


      });
    });
  };

  loadSupertoTank() {
    this.getfuelIdSuper();


    const snackBarRef = this._snackBar.openFromComponent(LoadingComponent, { duration: 500 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getfuelIdSuper();
      this.getinventoryCode();
      this.getAmountPending();
      this.getAvailable();


      const snackBarRef = this._snackBar.openFromComponent(LoadingComponent, { duration: 500 });
      snackBarRef.afterDismissed().subscribe(() => {
        this.getfuelIdSuper();
        this.getinventoryCode();
        this.getAmountPending();
        this.getAvailable();
        this.releaseFunction();
        this.releaseAmountSuper();
        this.resetDetailOrderValues();


      });
    });
  };

  loadDieseltoTank() {
    this.getfuelIdDiesel();


    const snackBarRef = this._snackBar.openFromComponent(LoadingComponent, { duration: 500 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getfuelIdDiesel();
      this.getinventoryCode();
      this.getAmountPending();
      this.getAvailable();


      const snackBarRef = this._snackBar.openFromComponent(LoadingComponent, { duration: 500 });
      snackBarRef.afterDismissed().subscribe(() => {
        this.getfuelIdDiesel();
        this.getinventoryCode();
        this.getAmountPending();
        this.getAvailable();
        this.releaseFunction();
        this.releaseAmountDiesel();
        this.resetDetailOrderValues();


      });
    });
  };

  saveSuper() {


    this.loadSupertoTank();
    this.btnsaveSuper = false;
    this.btnsaveRegular = true;

  }

  saveRegular() {

    this.loadRegulartoTank();
    this.btnsaveRegular = false;
    this.btnsaveDiesel = true;
  }


  saveDiesel() {


    this.loadDieseltoTank();
    this.btnsaveDiesel = false;
    this.savePurchase();
  }


  releaseAmountRegular() {
    this._fuelInventoryService.updateAvailableRegular(this.purchaseForm.value)
      .subscribe(data => {

      });
  };

  releaseAmountSuper() {
    this._fuelInventoryService.updateAvailableSuper(this.purchaseForm.value)
      .subscribe(data => {

      });
  };

  releaseAmountDiesel() {
    this._fuelInventoryService.updateAvailableDiesel(this.purchaseForm.value)
      .subscribe(data => {

      })
  }

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

  loadFuels(){
    this.btnsaveSuper = true;
    this.btnLoad = false;
  }

};
