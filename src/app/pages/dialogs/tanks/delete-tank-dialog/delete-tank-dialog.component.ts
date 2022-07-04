import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuelTanks } from 'src/app/models/fuelstation/tanks.model';
import { TanksService } from 'src/app/services/fuelstation/tanks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-tank-dialog',
  templateUrl: './delete-tank-dialog.component.html',
  styleUrls: ['./delete-tank-dialog.component.css']
})
export class DeleteTankDialogComponent implements OnInit {

  deleteFuelTankForm! : FormGroup;

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private fuelTankService : TanksService,
    @Inject(MAT_DIALOG_DATA) public fuelTank : FuelTanks,
    private dialogRef: MatDialogRef<DeleteTankDialogComponent>
  ) { }

  ngOnInit(): void {

    this.deleteFuelTankForm = this.fb.group({
      tankName: ['', Validators.required]
    });

    if(this.fuelTank){
      this.deleteFuelTankForm.controls['tankName'].setValue(this.fuelTank.tankName );

    };
  };
 
  deleteFuelTank(){
    const {tankName} = this.deleteFuelTankForm.value;

    const data ={
      fuelTankId : this.fuelTank.fuelTankId
    };

    this.fuelTankService.deleteTank
        (data).subscribe(resp => {
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/dashboard/infrastructure/tanks/listTanks']));
        this.deleteFuelTankForm.reset();
        Swal.fire('Eliminado', `${tankName} Eliminado Correctamente`, 'success');
        this.dialogRef.close('Eliminado');
        }, err => {
          Swal.fire('Error', err.error.msg, 'error')
        });
  };

};
