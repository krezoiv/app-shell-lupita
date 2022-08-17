import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';

@Component({
  selector: 'app-sales-control',
  templateUrl: './sales-control.component.html',
  styleUrls: ['./sales-control.component.css']
})
export class SalesControlComponent implements OnInit {

  salesControlForm : FormGroup = this.fb.group({
    salesDate : ['', Validators.required],
    noDocument :['', Validators.required],
    regularPrice :['', Validators.required],
    superPrice :['', Validators.required],
    dieselPrice :['', Validators.required],

  })
  constructor(
    private fb : FormBuilder,
    private _fuelService : FuelsService
  ) { }

  ngOnInit(): void {
    this.getFuelPrices();
  }


  getFuelPrices(){
    this._fuelService.getFuelPrices()
      .subscribe(data => {
        console.log(data.fuels)
      })
  }
}
