import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  purchaseForm : FormGroup = this.fb.group({

  })
  constructor(
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
