import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralDispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { Hoses } from 'src/app/models/fuelstation/hoses.models';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { HosesService } from 'src/app/services/fuelstation/hoses.service';
import { SalesControlService } from 'src/app/services/sales/sales-control.service';
import { TimerComponent } from 'src/app/shared/functions/timer/timer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-control',
  templateUrl: './sales-control.component.html',
  styleUrls: ['./sales-control.component.css']
})
export class SalesControlComponent implements OnInit {

  totalBalance!: Number | any;
  abonoBalanbce!: Number | any;
  result_total_abono!: Number | any;
  gallonsRegular!: Number | any;
  pricerRegular! : Number | any;
  totalRegular! : Number | any;
  gallonsSuper! : Number | any;
  priceSuper! : Number | any;
  totalSuper! : Number | any;
  gallonsDiesel! : Number | any;
  priceDiesel! : Number | any;
  totalDiesel! : Number | any;
  total! : Number | any;
  balance! : Number | any;
  abono_bills! : Number | any;
  abono_vales! : Number | any;
  abono_cupones! : Number | any;
  abono_vouchers! : Number | any;
  abono_deposits! : Number | any;
  abono_credits! : Number | any;
  totalAbonos! : Number | any;
  dateControl! : string;
  

  salesControlForm: FormGroup = this.fb.group({
    readingDate: ['', Validators.required],
    salesDate: ['', Validators.required],
    noDocument: [1, Validators.required],
    regularPrice: ['', Validators.required],
    superPrice: ['', Validators.required],
    dieselPrice: ['', Validators.required],
    totalGallonRegular: ['', Validators.required],
    totalGallonSuper: ['', Validators.required],
    totalGallonDiesel: ['', Validators.required],
    regularAccumulatedGallons: [101, Validators.required],
    superAccumulatedGallons: [450, Validators.required],
    dieselAccumulatedGallons: [672, Validators.required],
    total: ['', Validators.required],
    balance: ['', Validators.required],
    totalAbonosBalance: ['', Validators.required],
    bills: ['', Validators.required],
    vales: ['', Validators.required],
    cupones: ['', Validators.required],
    vouchers: ['', Validators.required],
    deposits: ['', Validators.required],
    credits: ['', Validators.required],
    applied :[true , Validators.required],
    abonos:['', Validators.required],

   
    

  });
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _hosesService: HosesService,
    private _dispenserService: DispensersService,
    private _salesControlService : SalesControlService

  ) { }

  ngOnInit(): void {

  }


  getRegularPrices() {
    this._hosesService.getRegularPrices()
      .subscribe((regularPrice) => {
        this.salesControlForm.controls['regularPrice'].setValue(regularPrice.regularPrice.fuelId?.salePrice);
        console.log(regularPrice)
      });
  };

  getSuperPrices() {
    this._hosesService.getSuperPrices()
      .subscribe((superPrice) => {
        this.salesControlForm.controls['superPrice'].setValue(superPrice.superPrice.fuelId?.salePrice);
      });
  };

  getDiselPrices() {
    this._hosesService.getDieselPrices()
      .subscribe((dieselPrice) => {
        this.salesControlForm.controls['dieselPrice'].setValue(dieselPrice.dieselPrice.fuelId?.salePrice);
      });
  };

  /**
   * this get the totals of gallons regular on db of the day
   */
  getTotalGallonRegular() {
    this._dispenserService.getTotalGallonsRegular(this.salesControlForm.value)
      .subscribe(({ totalRegularGallons }) => {
        this.salesControlForm.controls['totalGallonRegular'].setValue(totalRegularGallons.totalGallonRegular);

      });
  };


  /**
   * this get the totals of gallons  super on db of the day
   */
  getTotalGallonSuper() {
    this._dispenserService.getTotalGallonsSuper(this.salesControlForm.value)
      .subscribe(({ totalSuperGallons }) => {
        this.salesControlForm.controls['totalGallonSuper'].setValue(totalSuperGallons.totalGallonSuper);

      });
  };

  /**
 * this get the totals of gallons  super on db of the day
 */
  getTotalGallonDiesel() {
    this._dispenserService.getTotalGallonsDiesel(this.salesControlForm.value)
      .subscribe(({ totalDieselGallons }) => {
        this.salesControlForm.controls['totalGallonDiesel'].setValue(totalDieselGallons.totalGallonDiesel);

      });
  };

  openDay() {

    if (this.salesControlForm.get('readingDate')?.value == null || this.salesControlForm.get('readingDate')?.value == '') {
      Swal.fire('Informacíon', ` Debe seleccionar fecha`);
      return
    };
    this.dateControl = this.salesControlForm.get('readingDate')?.value;
    this.salesControlForm.controls['salesDate'].setValue(this.dateControl);
      this.getRegularPrices();
      this.getSuperPrices();
      this.getDiselPrices();
      this.getTotalGallonRegular();
      this.getTotalGallonSuper();
      this.getTotalGallonDiesel();

    
  };



  calculateTotals(){
    this.gallonsRegular = this.salesControlForm.get('totalGallonRegular')?.value;
    this.pricerRegular = this.salesControlForm.get('regularPrice')?.value;
    this.totalRegular = (this.gallonsRegular * this.pricerRegular);

    this.gallonsSuper = this.salesControlForm.get('totalGallonSuper')?.value;
    this.priceSuper = this.salesControlForm.get('superPrice')?.value;
    this.totalSuper = (this.gallonsSuper * this.priceSuper);
   

    this.gallonsDiesel = this.salesControlForm.get('totalGallonDiesel')?.value;
    this.priceDiesel = this.salesControlForm.get('dieselPrice')?.value;
    this.totalDiesel = (this.gallonsDiesel * this.priceDiesel);
   
    this.total = (this.totalRegular + this.totalSuper + this.totalDiesel);
   
    this.salesControlForm.controls['total'].setValue(this.total.toFixed(2));
    this.salesControlForm.controls['balance'].setValue( this.total.toFixed(2));
    this.salesControlForm.controls['totalAbonosBalance'].setValue(0.00);

  }

  calulcateAbonos(){



    this.abono_bills = this.salesControlForm.get('bills')?.value;
    this.abono_vales = this.salesControlForm.get('vales')?.value;
    this.abono_cupones = this.salesControlForm.get('cupones')?.value;
    this.abono_vouchers = this.salesControlForm.get('vouchers')?.value;
    this.abono_deposits = this.salesControlForm.get('deposits')?.value;
    this.abono_credits = this.salesControlForm.get('credits')?.value;

    this.totalAbonos = (this.abono_bills + this.abono_vales +this.abono_cupones + this.abono_vouchers + this.abono_deposits +this.abono_credits);
    this.salesControlForm.controls['abonos'].setValue(this.totalAbonos.toFixed(2));

    this.totalBalance = this.salesControlForm.get('total')?.value;
    this.abonoBalanbce  = this.salesControlForm.get('abonos')?.value;
    this.result_total_abono = ( this.totalBalance - this.abonoBalanbce);
    this.salesControlForm.controls['balance'].setValue(this.result_total_abono.toFixed(2));

    

  };

  confirmSale(){
    this.calculateTotals();
  };

  getTotalAbono(){
    this.calulcateAbonos();
  };

  createSalesControl(){
    this._salesControlService.createSalesControl(this.salesControlForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Numeracíon registrada Correctamente`, 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }

  saveSalesControl(){
    this.createSalesControl();
    console.log('save')
  }

};
