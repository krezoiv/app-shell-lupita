import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { SalesControl } from 'src/app/models/sales/salesControl.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';
import { SalesControlService } from 'src/app/services/sales/sales-control.service';

@Component({
  selector: 'app-delete-sales-control',
  templateUrl: './delete-sales-control.component.html',
  styleUrls: ['./delete-sales-control.component.css']
})
export class DeleteSalesControlComponent implements OnInit {

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
    this. lastSaleControl();
  }

  lastSaleControl(){

    this._salesControlService.lastSaleControl()
      .subscribe(({lastSale}) => {
       this.saleReporting = lastSale
      })
  }
}
