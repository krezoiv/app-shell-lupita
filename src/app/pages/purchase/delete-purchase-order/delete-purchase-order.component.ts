import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';
import { PurchasesService } from 'src/app/services/purchase/purchases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-purchase-order',
  templateUrl: './delete-purchase-order.component.html',
  styleUrls: ['./delete-purchase-order.component.css']
})
export class DeletePurchaseOrderComponent implements OnInit {

  
  purchaseOrder : PurchaseOrder[]=[];
  fuels: Fuels[] = [];
  deletePurchaseForm: FormGroup = this.fb.group({
    purchaseOrderId : [],
    orderNumber : []
  })

  constructor(
    private fb: FormBuilder,
    private _fuelService: FuelsService,
    private _purchaseService : PurchasesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLastPurchaseOrder();
  }

  getLastPurchaseOrder(){
    this._purchaseService.getLastPurchaseOrder()
      .subscribe(({lastPurchaseOrder, pchsOrdId}) => {
        this.purchaseOrder = lastPurchaseOrder
        this.deletePurchaseForm.controls['purchaseOrderId'].setValue(pchsOrdId.purchaseOrderId);
        this.deletePurchaseForm.controls['orderNumber'].setValue(pchsOrdId.orderNumber);
        console.log(lastPurchaseOrder)
        console.log(this.deletePurchaseForm.value)
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
        this._purchaseService.deletePurchaseOrder(this.deletePurchaseForm.value)
          .subscribe(({ updateAMountPendingSuper, updateAmountPendingRegular, updateAmountPendingDiesel, deletePurchaseOrderDetail, deletePurchaseOrder}) => {

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
