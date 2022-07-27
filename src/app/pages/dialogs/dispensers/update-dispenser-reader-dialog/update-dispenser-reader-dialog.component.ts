import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';

@Component({
  selector: 'app-update-dispenser-reader-dialog',
  templateUrl: './update-dispenser-reader-dialog.component.html',
  styleUrls: ['./update-dispenser-reader-dialog.component.css']
})
export class UpdateDispenserReaderDialogComponent implements OnInit {

  updateDispenserReaderForm! : FormGroup;
  selectedDispenserReader: DispenserReader[]=[];
  public dr: DispenserReader[]=[];

  constructor(
    private fb : FormBuilder,
    private _dispenserService : DispensersService,
    @Inject(MAT_DIALOG_DATA) public dispenserReader : DispenserReader,
    private dialogRef : MatDialogRef<UpdateDispenserReaderDialogComponent>
    
  ) { }

  ngOnInit(): void {

    this.updateDispenserReaderForm = this.fb.group({
         previousNoGallons :['', Validators.required],
         actualNoGallons :['', Validators.required],
         totalNoGallons :['', Validators.required],
         previousNoMechanic :['', Validators.required],
         actualNoMechanic :['', Validators.required],
         totalNoMechanic :['', Validators.required],
         previousNoMoney :['', Validators.required],
         actualNoMoney :['', Validators.required],
         totalNoMoney :['', Validators.required],
    });
    if(this.dispenserReader){
      this.updateDispenserReaderForm.controls['actualNoGallons'].setValue(this.dispenserReader.actualNoGallons);
      this.updateDispenserReaderForm.controls['actualNoMechanic'].setValue(this.dispenserReader.actualNoMechanic);
      this.updateDispenserReaderForm.controls['actualNoMoney'].setValue(this.dispenserReader.actualNoMoney);
    }
  }

}
