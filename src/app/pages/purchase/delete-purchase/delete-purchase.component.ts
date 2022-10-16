import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';
import { PurchasesService } from 'src/app/services/purchase/purchases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-purchase',
  templateUrl: './delete-purchase.component.html',
  styleUrls: ['./delete-purchase.component.css']
})
export class DeletePurchaseComponent implements OnInit {


  purchaseOrder : PurchaseOrder[]=[];
  fuels: Fuels[] = [];
  deletePurchaseForm: FormGroup = this.fb.group({
    purchaseOrderId : [],
    orderNumber : []
  })
  constructor(
    private fb: FormBuilder,
    private _purchaseService : PurchasesService,
    private _fuelService: FuelsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this. getLastPurchaseOrder();
  }

  getLastPurchaseOrder(){
    this._purchaseService.getLastPurchaseOrder()
      .subscribe(({lastPurchaseOrder, pchsOrdId}) => {
        this.purchaseOrder = lastPurchaseOrder
        this.deletePurchaseForm.controls['purchaseOrderId'].setValue(pchsOrdId.purchaseOrderId);
        this.deletePurchaseForm.controls['orderNumber'].setValue(pchsOrdId.orderNumber);
      })
  }


  deleteSalesControl(){
    Swal.fire({
      title: 'Desea eliminar registros?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._purchaseService.deletePurchase(this.deletePurchaseForm.value)
          .subscribe(({ updateAvailiableSuper, updateAvailiableRegular, updateAvailiableDiesel, deletePurchase}) => {

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
