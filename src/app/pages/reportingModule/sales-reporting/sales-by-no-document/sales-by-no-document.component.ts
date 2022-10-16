import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';
import { SalesControlService } from 'src/app/services/sales/sales-control.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-by-no-document',
  templateUrl: './sales-by-no-document.component.html',
  styleUrls: ['./sales-by-no-document.component.css']
})
export class SalesByNoDocumentComponent implements OnInit {

  saleReporting: SalesControl[] = [];
  fuels: Fuels[] = [];

  reportingSaleForm: FormGroup = this.fb.group({
    noDocument: ['']
  })

  constructor(
    private fb: FormBuilder,
    private _salesControlService: SalesControlService,
    private _fuelService: FuelsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getSalesByDocument() {
    this._salesControlService.getSaleByNoDocument(this.reportingSaleForm.value)
      .subscribe(({ salebyDocument }) => {
        this.saleReporting = salebyDocument;

      }, (err) => {
        Swal.fire({
          title: "Error!",
          text: (err.error.msg),
          timer: 4000
        });
        // Swal.fire('Error', err.error.msg, 'error');
        this.newSearch();
      })
  }

  getFuelPrice() {
    this._fuelService.getFuelsActive()
      .subscribe(({ fuels }) => {
        this.fuels = fuels;
      })
  }
  search() {

    this.getSalesByDocument();
    this.getFuelPrice();
  }

  newSearch() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard/reporteria/reporteVentasporDocumento']);
    });

  }
}
