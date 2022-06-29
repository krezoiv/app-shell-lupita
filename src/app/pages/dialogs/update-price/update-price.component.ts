import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.css']
})
export class UpdatePriceComponent implements OnInit {

  updatePriceForm! : FormGroup;

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<UpdatePriceComponent>,
  
  ) { }

  ngOnInit(): void {

    this.updatePriceForm = this.fb.group({
      costPrice : ['', Validators.required],
      salePrice : ['', Validators.required]
    })

    console.log(this.editData);

  }


  updatePrice(){
    console.log(this.updatePriceForm.value);
  }

}
