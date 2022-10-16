import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralDispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { FuelInventory } from 'src/app/models/fuelstation/fuelInventory.model';
import { Hoses } from 'src/app/models/fuelstation/hoses.models';
import { AuthService } from 'src/app/services/auth.service';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { FuelInventoryService } from 'src/app/services/fuelstation/fuel-inventory.service';
import { HosesService } from 'src/app/services/fuelstation/hoses.service';
import { SalesControlService } from 'src/app/services/sales/sales-control.service';
import { TimerComponent } from 'src/app/shared/functions/timer/timer.component';
import Swal from 'sweetalert2';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-sales-control',
  templateUrl: './sales-control.component.html',
  styleUrls: ['./sales-control.component.css']
})
export class SalesControlComponent implements OnInit {

  public countGallonsRegular: GeneralDispenserReader[] = [];
  public countGallonsSuper: GeneralDispenserReader[] = [];
  public countGallonsDiesel: GeneralDispenserReader[] = [];

  totalBalance!: Number | any;
  abonoBalanbce!: Number | any;
  result_total_abono!: Number | any;
  gallonsRegular!: Number | any;
  pricerRegular!: Number | any;
  totalRegular!: Number | any;
  gallonsSuper!: Number | any;
  priceSuper!: Number | any;
  totalSuper!: Number | any;
  gallonsDiesel!: Number | any;
  priceDiesel!: Number | any;
  totalDiesel!: Number | any;
  total!: Number | any;
  balance!: Number | any;
  abono_bills!: Number | any;
  abono_vales!: Number | any;
  abono_cupones!: Number | any;
  abono_vouchers!: Number | any;
  abono_deposits!: Number | any;
  abono_credits!: Number | any;
  totalAbonos!: Number | any;
  dateControl!: string;
  totalForm!: Number | any;
  newTotal!: Number | any;
  balanceForm!: Number | any;
  newBanlance!: Number | any;
  totalA: Number | any;
  availableregularDB!: Number | any;
  NewAvailableRegular!: Number | any;
  availableSuperDB!: Number | any;
  newAAvailableSuper!: Number | any;
  availableDieselDB!: Number | any;
  newAvailableDiesel!: Number | any;
  buttonSaleRegular: boolean = false;
  buttonSaleSuper: boolean  = false;
  buttonSaleDiesel: boolean = false;
  buttonAbonos: boolean= false;
  saveButton: boolean= false;


  salesControlForm: FormGroup = this.fb.group({
    readingDate: ['', Validators.required],
    salesDate: ['', Validators.required],
    noDocument: ['', Validators.required],
    regularPrice: ['', Validators.required],
    superPrice: ['', Validators.required],
    dieselPrice: ['', Validators.required],
    totalGallonRegular: ['', Validators.required],
    totalGallonSuper: ['', Validators.required],
    totalGallonDiesel: ['', Validators.required],
    regularAccumulatedGallons: [0, Validators.required],
    superAccumulatedGallons: [0, Validators.required],
    dieselAccumulatedGallons: [0, Validators.required],
    total: [0, Validators.required],
    balance: [0, Validators.required],
    totalAbonosBalance: ['', Validators.required],
    bills: ['', Validators.required],
    vales: ['', Validators.required],
    cupones: ['', Validators.required],
    vouchers: ['', Validators.required],
    deposits: ['', Validators.required],
    credits: ['', Validators.required],
    abonos: [0, Validators.required],
    available: ['', Validators.required],
    fuelId: ['', Validators.required],
    inventoryCode: ['', Validators.required],
    depositSlip: ['', Validators.required],
    generalDispenserReaderId :[],
    userName : []
  });

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _hosesService: HosesService,
    private _dispenserService: DispensersService,
    private _salesControlService: SalesControlService,
    private _fuelInventoryService: FuelInventoryService,
    private _authService : AuthService,
    private dateAdapter: DateAdapter<Date>
  ) { 
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void { 

this.salesControlForm.controls['userName'].setValue(this._authService.usuario.firstName);

  }



  //gete inventory code
  getinventoryCode() {
    this._fuelInventoryService.getinventoryCode(this.salesControlForm.value)
      .subscribe(({ inventoryCode }) => {
        this.salesControlForm.controls['inventoryCode'].setValue(inventoryCode.inventoryCode);
      });
  };


  //get available amount
  getAvailable() {
    this._fuelInventoryService.getFuelInventoryAvailable(this.salesControlForm.value)
      .subscribe(({ fuelInventoryAvailable }) => {
        this.salesControlForm.controls['available'].setValue(fuelInventoryAvailable.available);
      });
  };


  //get prices
  getRegularPrices() {
    this._hosesService.getRegularPrices()
      .subscribe((regularPrice) => {
        this.salesControlForm.controls['regularPrice'].setValue(regularPrice.regularPrice.fuelId?.salePrice);
      });
  };
  //get prices
  getSuperPrices() {
    this._hosesService.getSuperPrices()
      .subscribe((superPrice) => {
        this.salesControlForm.controls['superPrice'].setValue(superPrice.superPrice.fuelId?.salePrice);
      });
  };

    //get prices
  getDiselPrices() {
    this._hosesService.getDieselPrices()
      .subscribe((dieselPrice) => {
        this.salesControlForm.controls['dieselPrice'].setValue(dieselPrice.dieselPrice.fuelId?.salePrice);
      });
  };

  /**
   ** this get the totals of gallons regular on db of the day
  */
  getTotalGallonRegular() {
    this._dispenserService.getTotalGallonsRegular(this.salesControlForm.value)
      .subscribe(({ totalRegularGallons }) => {
        this.salesControlForm.controls['totalGallonRegular'].setValue(totalRegularGallons.totalMechanicRegular?.toFixed(3));
      });
  };

  /**
   ** get id regular fuel
   */
  getfuelIdRegular() {
    this._fuelInventoryService.getFuelIdRegular()
      .subscribe(({ fuelIdRegular }) => {
        this.salesControlForm.controls['fuelId'].setValue(fuelIdRegular.fuelId);
      });
  };

  /**
   ** get id super fuel
   */
  getfuelIdSuper() {
    this._fuelInventoryService.getFuelIdSuper()
      .subscribe(({ fuelIdSuper }) => {
        this.salesControlForm.controls['fuelId'].setValue(fuelIdSuper.fuelId);
      });
  };

  /**
   ** get id diesel fuel
   */
  getfuelIdDiesel() {
    this._fuelInventoryService.getFuelIdDiesel()
      .subscribe(({ fuelIdDiesel }) => {
        this.salesControlForm.controls['fuelId'].setValue(fuelIdDiesel.fuelId);
      });
  };


  /**
   ** this get the totals of gallons  super on db of the day
   */
  getTotalGallonSuper() {
    this._dispenserService.getTotalGallonsSuper(this.salesControlForm.value)
      .subscribe(({ totalSuperGallons }) => {
        this.salesControlForm.controls['totalGallonSuper'].setValue(totalSuperGallons.totalMechanicSuper?.toFixed(3));
      });
  };

  /**
 ** this get the totals of gallons  super on db of the day
 */
  getTotalGallonDiesel() {
    this._dispenserService.getTotalGallonsDiesel(this.salesControlForm.value)
      .subscribe(({ totalDieselGallons }) => {
        this.salesControlForm.controls['totalGallonDiesel'].setValue(totalDieselGallons.totalMechanicDiesel?.toFixed(3));
      });
  };

  openDay() {

   
    if (this.salesControlForm.get('readingDate')?.value == null || this.salesControlForm.get('readingDate')?.value == '') {
      Swal.fire('Informacíon', ` Debe seleccionar fecha`);
      return;
    };
    this.dateControl = this.salesControlForm.get('readingDate')?.value;
    this.salesControlForm.controls['salesDate'].setValue(this.dateControl);
    this.getRegularPrices();
    this.getSuperPrices();
    this.getDiselPrices();
    this.getTotalGallonRegular();
    this.getTotalGallonSuper();
    this.getTotalGallonDiesel();
    this.getCountGallonsRegular();
    this.getCountGallonsSuper();
    this.getCountGallonsDiesel();
    this.getLastNoDocumento();
    this.buttonSaleRegular = true;
    this.buttonSaleSuper = true;
    this.buttonSaleDiesel = true;
    this.getGeneralDispenserReaderid();
  };


//calculatesto send to totals
  calculateRegularTotals() {
    this.gallonsRegular = this.salesControlForm.get('totalGallonRegular')?.value;
    this.pricerRegular = this.salesControlForm.get('regularPrice')?.value;
    this.totalRegular = (this.gallonsRegular * this.pricerRegular);
    this.totalForm = this.salesControlForm.get('total')?.value;
    this.balanceForm = this.salesControlForm.get('balance')?.value;
    this.total = (this.totalForm + this.totalRegular);
    this.newBanlance = (this.balanceForm + this.total);
    this.salesControlForm.controls['total'].setValue(this.total.toFixed(2));
    this.salesControlForm.controls['balance'].setValue(this.total.toFixed(2));
    this.salesControlForm.controls['totalAbonosBalance'].setValue(0.00);
  };

  //calculatesto send to totals
  calculateSuperTotals() {
    this.gallonsSuper = this.salesControlForm.get('totalGallonSuper')?.value;
    this.priceSuper = this.salesControlForm.get('superPrice')?.value;
    this.totalSuper = (this.gallonsSuper * this.priceSuper);
    this.totalForm = this.salesControlForm.get('total')?.value;
    this.total = (parseFloat(this.totalSuper) + parseFloat(this.totalForm))
    this.salesControlForm.controls['total'].setValue(this.total.toFixed(2));
    this.salesControlForm.controls['balance'].setValue(this.total.toFixed(2));
  };

//calculatesto send to totals
  calculateDieselTotals() {
    this.gallonsDiesel = this.salesControlForm.get('totalGallonDiesel')?.value;
    this.priceDiesel = this.salesControlForm.get('dieselPrice')?.value;
    this.totalDiesel = (this.gallonsDiesel * this.priceDiesel);
    this.totalForm = this.salesControlForm.get('total')?.value;
    this.total = (parseFloat(this.totalDiesel) + parseFloat(this.totalForm))
    this.salesControlForm.controls['total'].setValue(this.total.toFixed(2));
    this.salesControlForm.controls['balance'].setValue(this.total.toFixed(2));
  };

  //calculates to send to totals
  calulcateAbonos() {
    this.abono_bills = this.salesControlForm.get('bills')?.value;
    this.abono_vales = this.salesControlForm.get('vales')?.value;
    this.abono_cupones = this.salesControlForm.get('cupones')?.value;
    this.abono_vouchers = this.salesControlForm.get('vouchers')?.value;
    this.abono_deposits = this.salesControlForm.get('deposits')?.value;
    this.abono_credits = this.salesControlForm.get('credits')?.value;
    this.totalAbonos = (this.abono_bills + this.abono_vales + this.abono_cupones + this.abono_vouchers + this.abono_deposits + this.abono_credits);
    this.salesControlForm.controls['abonos'].setValue(this.totalAbonos.toFixed(2));
    this.totalBalance = this.salesControlForm.get('total')?.value;
    this.abonoBalanbce = this.salesControlForm.get('abonos')?.value;
    this.result_total_abono = (this.abonoBalanbce  - this.totalBalance );
    this.salesControlForm.controls['balance'].setValue(this.result_total_abono.toFixed(2));
  };

  //rest amount to available to set nwe amount on inventory
  restAvailableRegular() {
    this.availableregularDB = this.salesControlForm.get('available')?.value;
    this.totalRegular = this.salesControlForm.get('totalGallonRegular')?.value;
    this.NewAvailableRegular = ((this.availableregularDB) - (this.totalRegular));
    this.salesControlForm.controls['available'].setValue(parseFloat(this.NewAvailableRegular));
   
  };
 //rest amount to available to set nwe amount on inventory
  restAvailableSuper() {
    this.availableSuperDB = this.salesControlForm.get('available')?.value;
    this.totalSuper = this.salesControlForm.get('totalGallonSuper')?.value;
    this.newAAvailableSuper = ((this.availableSuperDB) - (this.totalSuper));
    this.salesControlForm.controls['available'].setValue(parseFloat(this.newAAvailableSuper));
  };
 //rest amount to available to set nwe amount on inventory
  restAvailableDiesel() {
    this.availableDieselDB = this.salesControlForm.get('available')?.value;
    this.totalDiesel = this.salesControlForm.get('totalGallonDiesel')?.value;
    this.newAvailableDiesel = ((this.availableDieselDB) - (this.totalDiesel));
    this.salesControlForm.controls['available'].setValue(parseFloat(this.newAvailableDiesel));
  }

  /**
   * *Method that will send the total to the sale box and subtract from the inventory Regular
   * *Metodo que enviara el total al cuadre de venta y restara del inventario Regular
  */
  confirmRegularSale() {
    const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
    snackBarRef1.afterDismissed().subscribe(() => {
      this.getfuelIdRegular();
      this.getAvailable();
      this.getinventoryCode();
    });
    this.getfuelIdRegular();
    const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getfuelIdRegular();
      this.getAvailable();
      this.getinventoryCode();
      this.calculateRegularTotals();
    });
    const snackBarRef2 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
    snackBarRef2.afterDismissed().subscribe(() => {
      this.restAvailableRegular();
      this.updateAvailableRegular();
      this.buttonSaleRegular = false;
      this.buttonAbonos = true;
    });
  };


  /**
   * *Method that will send the total to the sale box and subtract from the inventory Super
   * *Metodo que enviara el total al cuadre de venta y restara del inventario Super
  */
  confirmSuperSale() {
    const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
    snackBarRef1.afterDismissed().subscribe(() => {
      this.getfuelIdSuper();
      this.getAvailable();
      this.getinventoryCode();
    });
    this.getfuelIdSuper();
    const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getfuelIdSuper();
      this.getAvailable();
      this.getinventoryCode();
      this.calculateSuperTotals();
    });
    const snackBarRef2 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
    snackBarRef2.afterDismissed().subscribe(() => {
      this.restAvailableSuper();
      this.updateAvailableSuper();
      this.buttonSaleSuper = false;
      this.buttonAbonos = true;
    });
  };



  /**
   * *Method that will send the total to the sale box and subtract from the inventory Regular
   * *Metodo que enviara el total al cuadre de venta y restara del inventario Regular
  */
  confirmDieselSale() {
    const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
    snackBarRef1.afterDismissed().subscribe(() => {
      this.getfuelIdDiesel();
      this.getAvailable();
      this.getinventoryCode();
    });
    this.getfuelIdDiesel();
    const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
    snackBarRef.afterDismissed().subscribe(() => {
      this.getfuelIdDiesel();
      this.getAvailable();
      this.getinventoryCode();
      this.calculateDieselTotals();
    });
    const snackBarRef2 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
    snackBarRef2.afterDismissed().subscribe(() => {
      this.restAvailableDiesel();
      this.updateAvailableDiesel();
      this.buttonSaleDiesel = false;
      this.buttonAbonos = true;
    });
  };

  getTotalAbono() { this.calulcateAbonos(); this.saveButton = true };


  //method tha creat a sale control
  createSalesControl() {
    this._salesControlService.createSalesControl(this.salesControlForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Cuadre registrada Correctamente`, 'success');
        this.salesControlForm.reset();
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  //** saves daily sales control
  //** guarda el cuadre de venta del dia */*/
  saveSalesControl() { this.createSalesControl(); };

  //* get the sum of the gallonages of regular 
  //* obtiene la sumatorio de los galonajes de regular */
  getCountGallonsRegular() {
    this._dispenserService.getCountGallonsRegular()
      .subscribe(({ countGallonsRegular }) => {
        this.countGallonsRegular = countGallonsRegular
      });
  };


  //* get the sum of the gallonages of super 
  //* obtiene la sumatorio de los galonajes de super */
  getCountGallonsSuper() {
    this._dispenserService.getCountGallonsSuper()
      .subscribe(({ countGallonsSuper }) => {
        this.countGallonsSuper = countGallonsSuper
      });
  };

  //* get the sum of the gallonages of diesel 
  //* obtiene la sumatorio de los galonajes de diesel */
  getCountGallonsDiesel() {
    this._dispenserService.getCountGallonsDiesel()
      .subscribe(({ countGallonsDiesel }) => {
        this.countGallonsDiesel = countGallonsDiesel
      });
  };


  //get las no document
  getLastNoDocumento() {
    this._salesControlService.getLastNoDocumentSale()
      .subscribe((noDocumentSale) => {
        this.salesControlForm.controls['noDocument'].setValue(noDocumentSale.noDocumentSale.noDocument + 1);
      });
  };


  //method that update available
  updateAvailableRegular() {
    this._fuelInventoryService.updateAvailableRegularSale(this.salesControlForm.value)
      .subscribe((data) => {
        Swal.fire({
          title: "Descontado!",
          text: "Combustible descontado de tanque",
          timer: 400
        })
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  //method that update available
  updateAvailableSuper() {
    this._fuelInventoryService.updateAvailableSuperSale(this.salesControlForm.value)
      .subscribe((data) => {
        Swal.fire({
          title: "Descontado!",
          text: "Combustible descontado de tanque",
          timer: 400
        })
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  //method that update available
  updateAvailableDiesel() {
    this._fuelInventoryService.updateAvailableDieselSale(this.salesControlForm.value)
      .subscribe((data) => {
        Swal.fire({
          title: "Descontado!",
          text: "Combustible descontado de tanque",
          timer: 400
        })
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };


//get general dispenser reader id
  getGeneralDispenserReaderid(){
    this._dispenserService.getGeneralDispenserReaderId(this.salesControlForm.value)
      .subscribe(({generalDispenserReader}) => {
        this.salesControlForm.controls['generalDispenserReaderId'].setValue(generalDispenserReader.generalDispenserReaderId);
      })
  }

};
