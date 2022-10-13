import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';
import { SalesControlService } from 'src/app/services/sales/sales-control.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-sales-control',
  templateUrl: './delete-sales-control.component.html',
  styleUrls: ['./delete-sales-control.component.css']
})
export class DeleteSalesControlComponent implements OnInit {

  saleReporting: SalesControl[] = [];
  fuels: Fuels[] = [];


  reportingSaleForm: FormGroup = this.fb.group({
    noDocument: [''],
    generalDispenserReaderId: []
  })
  constructor(
    private fb: FormBuilder,
    private _salesControlService: SalesControlService,
    private _fuelService: FuelsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.lastSaleControl();
  }

  lastSaleControl() {

    this._salesControlService.lastSaleControl()
      .subscribe(({ lastSale, noDocument, gnrlDispId }) => {
        this.saleReporting = lastSale
        this.reportingSaleForm.controls['noDocument'].setValue(noDocument.noDocument);
        this.reportingSaleForm.controls['generalDispenserReaderId'].setValue(gnrlDispId.generalDispenserReaderId);
        console.log(this.reportingSaleForm.value)
      })
  }

  deleteSalesControl() {
    Swal.fire({
      title: 'Desea eliminar registros?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._salesControlService.deleteSalesControl(this.reportingSaleForm.value)
          .subscribe(({ updateAvailiableSuper, updateAvailiableRegular, updateAvailiableDiesel, deleteSale }) => {

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registros eliminados',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigateByUrl('/dashboard');
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
