import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Dispensers } from 'src/app/models/fuelstation/dispensers.model';
import { Island } from 'src/app/models/fuelstation/island.models';
import { Status } from 'src/app/models/status.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';
import { StatusService } from 'src/app/services/functions/status.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-dispenser-dialog',
  templateUrl: './update-dispenser-dialog.component.html',
  styleUrls: ['./update-dispenser-dialog.component.css']
})
export class UpdateDispenserDialogComponent implements OnInit {

  updateDispenserForm! : FormGroup;
  selectStatus : Status[]=[];
  selectIsland : Island[]=[];
  public dispenser : Dispensers[]=[];

  constructor(
    private fb : FormBuilder,
    private rotuer : Router,
    private dispenserService : DispensersService,
    private statusService : StatusService,
    private islandService : IslandsService,
    @Inject(MAT_DIALOG_DATA) public dispensers : Dispensers,
    private dialogRef: MatDialogRef<UpdateDispenserDialogComponent>
  ) { }


  ngOnInit(): void {

    this.updateDispenserForm = this.fb.group({
      dispenserCode : ['', Validators.required],
      islandId : ['', Validators.required],
      statusId : ['', Validators.required]
    })
    if(this.dispenser){
      this.updateDispenserForm.controls['dispenserCode'].setValue(this.dispensers.dispenserCode);
      this.updateDispenserForm.controls['islandId'].setValue(this.dispensers.islandId);
      this.updateDispenserForm.controls['statusId'].setValue(this.dispensers.statusId);
    }
    
    this.getStatus();
    this.getIslandActive();
  }

  getStatus(){
    this.statusService.getStatus()
        .subscribe(({status}) => {
          this.selectStatus = status
        });
  };

  getIslandActive(){
    this.islandService.getIslandsActive()
        .subscribe(({island})=> {
          this.selectIsland = island
        });
  };

  updateDispenser(){
    const data ={
      ...this.updateDispenserForm.value,
      dispenserId : this.dispensers.dispenserId
    }

    this.dispenserService.updateDispenser
        (data).subscribe(resp => {
          this.rotuer.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
          this.rotuer.navigate(['/dashboard/infrastructure/dispensers/listDispensers']));
        this.updateDispenserForm.reset();
        Swal.fire('Actualizado', `Actualizado Correctamente`, 'success');
        this.dialogRef.close('actualizado');
        },  err => {
          Swal.fire('Error', err.error.msg, 'error')
        })
        
  }



}
