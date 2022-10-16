import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { InfrastructuresService } from 'src/app/services/infrastructures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.css']
})

/**
 * ! class that is use to uptade fuel price
 */
export class UpdatePriceComponent implements OnInit {

  //public fuelSelected!: Fuels
  updatePriceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private infrastructureService: InfrastructuresService,
    @Inject(MAT_DIALOG_DATA) public fuels: Fuels,
    private dialogRef: MatDialogRef<UpdatePriceComponent>,

  ) {

  }

  ngOnInit(): void {

    this.updatePriceForm = this.fb.group({

      fuelName: ['', Validators.required],
      costPrice: ['', Validators.required],
      salePrice: ['', Validators.required],
      idpAmount: ['', Validators.required],
      taxesId: ['', Validators.required],

    })

    if (this.fuels) {
      this.updatePriceForm.controls['fuelName'].setValue(this.fuels.fuelName);
      this.updatePriceForm.controls['costPrice'].setValue(this.fuels.costPrice);
      this.updatePriceForm.controls['salePrice'].setValue(this.fuels.salePrice);
      this.updatePriceForm.controls['idpAmount'].setValue(this.fuels.taxesId?.idpAmount);
      this.updatePriceForm.controls['taxesId'].setValue(this.fuels.taxesId?.idpName);
    }

  }


  updatePrice() {
    Swal.fire({
      title: 'Desea actualizar precio?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Actualizar',
      denyButtonText: `Cancelar`,
    }).then((result) => {

      if (result.isConfirmed) {
        const { fuelName } = this.updatePriceForm.value;
        const data = {
          ...this.updatePriceForm.value,
          fuelId: this.fuels.fuelId
        }
        this.infrastructureService.updatePriceFuel(data)
          .subscribe(resp => {
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
              this.router.navigate(['/dashboard/infrastructura/combustibles/listado-combustibles']));
            this.updatePriceForm.reset();
            Swal.fire('Actualizado', `${fuelName} Actualizado Correctamente`, 'success');
            this.dialogRef.close('actualizado');

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Combustible actualizado',
              showConfirmButton: false,
              timer: 1500
            })

          }, error => {
            Swal.fire('Error', error.error.msg, 'error')
          })
      } else if (result.isDenied) {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'Proceso Cancelado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }



}
