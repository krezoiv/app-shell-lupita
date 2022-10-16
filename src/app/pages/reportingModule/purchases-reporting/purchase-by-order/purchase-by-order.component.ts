import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { PurchaseOrder } from 'src/app/models/purchase/purchaseOrder.model';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';
import { PurchasesReportingService } from 'src/app/services/reporting/purchases-reporting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-by-order',
  templateUrl: './purchase-by-order.component.html',
  styleUrls: ['./purchase-by-order.component.css']
})
export class PurchaseByOrderComponent implements OnInit {

  purchaseReporting : PurchaseOrder[]=[];
  fuels: Fuels[] = [];
  reportingPurchaseForm: FormGroup = this.fb.group({
    orderNumber : []
  })
  constructor(
    private fb: FormBuilder,
    private _fuelService: FuelsService,
    private _purchaseReportingService : PurchasesReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getPurchaseByNoOrder(){
    this._purchaseReportingService.getPurchaseByNoOrder(this.reportingPurchaseForm.value)
      .subscribe(({purchaseByOrder}) => {
        this.purchaseReporting = purchaseByOrder;
      }, (err) => {
        Swal.fire({
          title: "Error!",
          text: (err.error.msg),
          timer: 4000
        });
        // Swal.fire('Error', err.error.msg, 'error');
        this.newSearch();
      })
  };

  getFuelPrice() {
    this._fuelService.getFuelsActive()
      .subscribe(({ fuels }) => {
        this.fuels = fuels;
      })
  }
  search(){
    this.getPurchaseByNoOrder();
    this.getFuelPrice();
  };

  newSearch(){
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard/reporteria/reporteVentasporDocumento']);
    });
  };
}
