import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { DigitizeDispenserComponent } from 'src/app/pages/cuadres/digitize-dispenser/digitize-dispenser.component';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import Swal from 'sweetalert2';
import { ConfirmationsComponent } from '../../confirmations/confirmations.component';

@Component({
  selector: 'app-update-dispenser-reader-dialog',
  templateUrl: './update-dispenser-reader-dialog.component.html',
  styleUrls: ['./update-dispenser-reader-dialog.component.css']
})
export class UpdateDispenserReaderDialogComponent implements OnInit {

  
  RegularGActual!: Number | any;
  RegularGPrevious!: Number | any;
  DieselMY!: Number | any;

  a!: Number | any;
  b!: Number | any;
  c!: Number | any;

  gallonA!: Number | any;
  gallonP!: Number | any;
  ResultG!: Number | any;
  ResultM!: Number | any;
  ResultMY!: Number | any;

  updateDispenserReaderForm!: FormGroup;
  selectedDispenserReader: DispenserReader[] = [];
  public dispenserReaderG: DispenserReader[] = [];
  public dr: DispenserReader[] = [];

  constructor(
    private fb: FormBuilder,
    private _dispenserService: DispensersService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dispenserReader: DispenserReader,
    private dialogRef: MatDialogRef<UpdateDispenserReaderDialogComponent>

  ) { }

  ngOnInit(): void {

    this.updateDispenserReaderForm = this.fb.group({
      previousNoGallons: [''],
      actualNoGallons: [''],
      totalNoGallons: [''],
      previousNoMechanic: [''],
      actualNoMechanic: [''],
      totalNoMechanic: [''],
      previousNoMoney: [''],
      actualNoMoney: [''],
      totalNoMoney: [''],
      dispenserReaderId: [''],
      fuelName :[''],
      totalGallonRegular :[''],
      generalDispenserReaderId : [''],
     
 

    });
    if (this.dispenserReader) {

      this.updateDispenserReaderForm.controls['generalDispenserReaderId'].setValue(this.dispenserReader.generalDispenserReaderId);
      this.updateDispenserReaderForm.controls['totalNoGallons'].setValue(this.dispenserReader.totalNoGallons);
      this.updateDispenserReaderForm.controls['actualNoGallons'].setValue(this.dispenserReader.actualNoGallons);
      this.updateDispenserReaderForm.controls['actualNoMechanic'].setValue(this.dispenserReader.actualNoMechanic);
      this.updateDispenserReaderForm.controls['actualNoMoney'].setValue(this.dispenserReader.actualNoMoney);
      this.updateDispenserReaderForm.controls['dispenserReaderId'].setValue(this.dispenserReader.dispenserReaderId);
      this.updateDispenserReaderForm.controls['fuelName'].setValue(this.dispenserReader.assignmentHoseId?.hoseId?.fuelId?.fuelName);

      this.RegularGActual = this.updateDispenserReaderForm.get('actualNoGallons')?.value;
      this.RegularGPrevious = this.updateDispenserReaderForm.get('totalNoGallons')?.value;

      this.ResultG = this.RegularGActual - this.RegularGPrevious

      this.updateDispenserReaderForm.controls['previousNoGallons'].setValue(this.ResultG);

    };
  };


  updateDispenserReader() {

    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    this._dispenserService.updateDispenserReader
      (this.updateDispenserReaderForm.value).subscribe(resp => {
        
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
        this.dialogRef.close('actualizado');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
    console.log(this.updateDispenserReaderForm.value)

  };

  update() {
    
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
     
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
       this.updateDispenserReader();
        this.updateTotalGallons();
        this.updateGallons();
  
       console.log(this.updateDispenserReaderForm.value)
      };
    });
  };

  updateTotalGallons(){
    const data = {
      ...this.updateDispenserReaderForm.value,

    };

    this._dispenserService.updateTotalGallons(data)
      .subscribe(resp => {
      });
      
    console.log(this.updateDispenserReaderForm.value)
  };

  gallonageResults(){
    
    this.gallonP = this.updateDispenserReaderForm.get('previousNoGallons')?.value;
    this.gallonA = this.updateDispenserReaderForm.get('actualNoGallons')?.value;
    this.ResultG = this.gallonA - this.gallonP;
    this.updateDispenserReaderForm.controls['totalNoGallons'].setValue(this.ResultG);

    console.log(this.updateDispenserReaderForm.value)

  }

  calculateTotalGeneralGallons(){

    this.a = this.updateDispenserReaderForm.get('actualNoGallons')?.value;
    this.b = this.updateDispenserReaderForm.get('previousNoGallons')?.value;
    this.c = this.a - this.b;

    this.updateDispenserReaderForm.controls['totalGallonRegular'].setValue(this.c);
  }

  updateGallons() {
    const data = {
      ...this.updateDispenserReaderForm.value,

    };

    this._dispenserService.updateTotalGallons(data)
      .subscribe(resp => {

      });
  };



};
