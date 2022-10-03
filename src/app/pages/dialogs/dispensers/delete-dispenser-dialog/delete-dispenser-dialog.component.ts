import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Dispensers } from 'src/app/models/fuelstation/dispensers.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-dispenser-dialog',
  templateUrl: './delete-dispenser-dialog.component.html',
  styleUrls: ['./delete-dispenser-dialog.component.css']
})

/**
 * ! class that is use to delete a dispenser
 */
export class DeleteDispenserDialogComponent implements OnInit {

  deleteDispenserForm! : FormGroup;

  constructor(
    private fb : FormBuilder,
    private rotuer : Router,
    private dispenserService : DispensersService,
    @Inject(MAT_DIALOG_DATA) public dispensers : Dispensers,
    private dialogRef : MatDialogRef<DeleteDispenserDialogComponent>
  ) { }

  ngOnInit(): void {

    this.deleteDispenserForm = this.fb.group({
      dispenserCode : ['', Validators.required]
    })

    if(this.dispensers){
      this.deleteDispenserForm.controls['dispenserCode'].setValue(this.dispensers.dispenserCode)
    }
  }

  deleteDispenser(){
    const {dispenserCode} = this.deleteDispenserForm.value;

    const data ={
      dispenserId: this.dispensers.dispenserId
    };
   this.dispenserService.deleteDispenser
        (data).subscribe(resp => {

        this.rotuer.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
        this.rotuer.navigate(['/dashboard/infrastructure/dispensers/listDispensers']));
        this.deleteDispenserForm.reset();
        Swal.fire('Eliminado', `${dispenserCode} Eliminado Correctamente`, 'success');
        this.dialogRef.close('Eliminado');
        }, err => {
          Swal.fire('Error', err.error.msg, 'error')
        });

        
  }

}
