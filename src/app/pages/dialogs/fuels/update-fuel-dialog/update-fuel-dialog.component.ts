
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Status } from 'src/app/models/status.model';
import { InfrastructuresService } from 'src/app/services/infrastructures.service';
import { UsersService } from 'src/app/services/users.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-fuel-dialog',
  templateUrl: './update-fuel-dialog.component.html',
  styleUrls: ['./update-fuel-dialog.component.css']
})


/**
 * ! class that is use to uptade fuel 
 */
export class UpdateFuelDialogComponent implements OnInit {

  updateFuelForm! : FormGroup;
  selectedStatus : Status[]=[];
  public fuel: Fuels[] = [];

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private infrastructureService:InfrastructuresService,
    private usersService : UsersService,
    
    @Inject(MAT_DIALOG_DATA) public fuels : Fuels,
    private dialogRef : MatDialogRef<UpdateFuelDialogComponent>

  ) { }

  ngOnInit(): void {

    this.updateFuelForm = this.fb.group({
      fuelName:  ['', Validators.required],
      costPrice: ['', Validators.required],
      salePrice: ['', Validators.required],
      statusId : ['', Validators.required],
      idpAmount : ['', Validators.required]
    })

    if (this.fuels) {
      this.updateFuelForm.controls['fuelName'].setValue(this.fuels.fuelName );
      this.updateFuelForm.controls['idpAmount'].setValue(this.fuels.fuelName);
      this.updateFuelForm.controls['fuelName'].setValue(this.fuels.fuelName);
      this.updateFuelForm.controls['costPrice'].setValue(this.fuels.costPrice);
      this.updateFuelForm.controls['salePrice'].setValue(this.fuels.salePrice);
      this.updateFuelForm.controls['statusId'].setValue(this.fuels.statusId?.statusName);
    }

    this.getStatus();
  }

  getFuels() {

    this.infrastructureService.getFuels()
      .subscribe(({ fuels }) => {
        this.fuel = fuels
      })

    }

    getStatus(){
      this.usersService.getStatus()
          .subscribe(({status}) => {
            this.selectedStatus = status
          });
    };

  updateFuel(){
    const { fuelName } = this.updateFuelForm.value;
    const data = {
      ...this.updateFuelForm.value,
      fuelId: this.fuels.fuelId
    }
   
    this.infrastructureService.updateFuel
      (data).subscribe(resp => {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/dashboard/infrastructure/fuels/listFuels']));
        this.updateFuelForm.reset();
        Swal.fire('Actualizado', `${fuelName} Actualizado Correctamente`, 'success');
        this.dialogRef.close('actualizado');
      },err => {
        Swal.fire('Error', err.error.msg, 'error')
      })}

  
}