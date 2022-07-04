
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { InfrastructuresService } from 'src/app/services/infrastructures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-fuel-dialog',
  templateUrl: './delete-fuel-dialog.component.html',
  styleUrls: ['./delete-fuel-dialog.component.css']
})
export class DeleteFuelDialogComponent implements OnInit {

  deleteFuelForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private infrastructureService: InfrastructuresService,
    @Inject(MAT_DIALOG_DATA) public fuels: Fuels,
    private dialogRef: MatDialogRef<DeleteFuelDialogComponent>,

  ) { }

  ngOnInit(): void {

    this.deleteFuelForm = this.fb.group({

      fuelName: ['', Validators.required],
      costPrice: ['', Validators.required],
      salePrice: ['', Validators.required]
    })

    if (this.fuels) {
      this.deleteFuelForm.controls['fuelName'].setValue(this.fuels.fuelName);
      this.deleteFuelForm.controls['fuelName'].setValue(this.fuels.fuelName);
      this.deleteFuelForm.controls['costPrice'].setValue(this.fuels.costPrice);
      this.deleteFuelForm.controls['salePrice'].setValue(this.fuels.salePrice);
    }
  }


  deleteFuel() {
    const { fuelName } = this.deleteFuelForm.value;

    const data = {

      fuelId: this.fuels.fuelId
    }

    this.infrastructureService.deleteFuel
      (data).subscribe(resp => {

        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/dashboard/infrastructure/fuels/listFuels']));
        this.deleteFuelForm.reset();
        Swal.fire('Eliminado', `${fuelName} Eliminado Correctamente`, 'success');
        this.dialogRef.close('Eliminado');


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });

  };

};
