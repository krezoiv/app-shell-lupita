import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';
import { PurchasesService } from 'src/app/services/purchase/purchases.service';

@Component({
  selector: 'app-delete-purchase-order',
  templateUrl: './delete-purchase-order.component.html',
  styleUrls: ['./delete-purchase-order.component.css']
})
export class DeletePurchaseOrderComponent implements OnInit {

  
  purchaseOrder : PurchaseOrder[]=[];
  fuels: Fuels[] = [];
  deletePurchaseForm: FormGroup = this.fb.group({
    purchaseOrderId : []
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
        console.log(lastPurchaseOrder)
        console.group(this.deletePurchaseForm.value)
      })
  }

}
