import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuelTanks } from 'src/app/models/fuelstation/tanks.model';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Status } from 'src/app/models/status.model';
import { TanksService } from 'src/app/services/fuelstation/tanks.service';
import { StatusService } from 'src/app/services/functions/status.service';
import { InfrastructuresService } from 'src/app/services/infrastructures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-tank-dialog',
  templateUrl: './update-tank-dialog.component.html',
  styleUrls: ['./update-tank-dialog.component.css']
})
export class UpdateTankDialogComponent implements OnInit {

  updateFuelTankForm!  : FormGroup;
  selectedStatus : Status[]=[];
  selectedFuel : Fuels[] =[];
  public tank : FuelTanks[]=[];

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private fuelTanksService : TanksService,
    private infrastructureService : InfrastructuresService,
    private statusService : StatusService,
    @Inject(MAT_DIALOG_DATA) public fuelTank : FuelTanks,
    private dialogRef :MatDialogRef<UpdateTankDialogComponent>

  ) { }

  ngOnInit(): void {

    this.updateFuelTankForm = this.fb.group({
      tankName : ['', Validators.required],
      maxStorage : ['', Validators.required],
      fuelId : ['', Validators.required],
      statusId : ['', Validators.required]
    })

    if(this.fuelTank){
      this.updateFuelTankForm.controls['tankName'].setValue(this.fuelTank.tankName);
      this.updateFuelTankForm.controls['maxStorage'].setValue(this.fuelTank.maxStorage);
      this.updateFuelTankForm.controls['fuelId'].setValue(this.fuelTank.fuelId);
      this.updateFuelTankForm.controls['statusId'].setValue(this.fuelTank.statusId);
    }
    this.getStatus();
    this.getFuels();
  }

  getFuels() {

    this.infrastructureService.getFuels()
      .subscribe(({ fuels }) => {
        this.selectedFuel = fuels
      })

    }

    getStatus(){
      this.statusService.getStatus()
          .subscribe(({status}) => {
            this.selectedStatus = status
          });
    };


    updateFuelTank(){
      const {tankName} = this.updateFuelTankForm.value;
      const data ={
        ...this.updateFuelTankForm.value,
        fuelTankId : this.fuelTank.fuelTankId
      }

      this.fuelTanksService.updateTank
          (data).subscribe(resp => {
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/dashboard/infrastructure/tanks/listTanks']));
        this.updateFuelTankForm.reset();
        Swal.fire('Actualizado', `${tankName} Actualizado Correctamente`, 'success');
        this.dialogRef.close('actualizado');

          },err => {
            Swal.fire('Error', err.error.msg, 'error')
          })
    }
}
