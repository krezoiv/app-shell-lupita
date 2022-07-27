import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  }

}
