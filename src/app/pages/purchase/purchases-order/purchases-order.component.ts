import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-purchases-order',
  templateUrl: './purchases-order.component.html',
  styleUrls: ['./purchases-order.component.css']
})
export class PurchasesOrderComponent implements OnInit {

  orderForm : FormGroup = this.fb.group({

  });

  constructor(
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
