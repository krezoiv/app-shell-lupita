import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hoses } from 'src/app/models/fuelstation/hoses.models';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Status } from 'src/app/models/status.model';
import { HosesService } from 'src/app/services/fuelstation/hoses.service';
import { StatusService } from 'src/app/services/functions/status.service';
import { InfrastructuresService } from 'src/app/services/infrastructures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-hoses',
  templateUrl: './update-hoses.component.html',
  styleUrls: ['./update-hoses.component.css']
})
export class UpdateHosesComponent implements OnInit {

  updateHoseForm! : FormGroup;
  selectedStatus : Status[]=[];
  selectedFuels : Fuels[]=[];
  public hose : Hoses[]=[];

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private hoseServices : HosesService,
    private infrastructureService : InfrastructuresService,
    private statusService : StatusService,
    @Inject(MAT_DIALOG_DATA) public hoses : Hoses,
    private dialogRef : MatDialogRef<UpdateHosesComponent>

  ) { }

  ngOnInit(): void {

    this.updateHoseForm = this.fb.group({
      hoseColor : ['', Validators.required],
      fuelId : ['', Validators.required],
      statusId : ['', Validators.required]
    })

    if(this.hoses){
      this.updateHoseForm.controls['hoseColor'].setValue(this.hoses.hoseColor);
      this.updateHoseForm.controls['fuelId'].setValue(this.hoses.fuelId);
      this.updateHoseForm.controls['statusId'].setValue(this.hoses.statusId);
    };

    this.getStatus();
    this.getFuelsActive();
  }

  getFuelsActive() {

    this.infrastructureService.getFuelsActive()
      .subscribe(({ fuels }) => {
        this.selectedFuels = fuels
      });

    };

    getStatus(){
      this.statusService.getStatus()
          .subscribe(({status}) => {
            this.selectedStatus = status
          });
    };

    updateHose(){
      const {hoseColor} = this.updateHoseForm.value;
      const data = {
        ...this.updateHoseForm.value,
        hoseId : this.hoses.hoseId
      };

      this.hoseServices.updateHose
      (data).subscribe(resp => {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/dashboard/infrastructure/hoses/listHoses']));
    this.updateHoseForm.reset();
    Swal.fire('Actualizado', ` Manguera ${hoseColor} Actualizado Correctamente`, 'success');
    this.dialogRef.close('actualizado');

      },err => {
        Swal.fire('Error', err.error.msg, 'error')
        console.log(err)
      })

    }


}
