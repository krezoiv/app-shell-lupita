import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
