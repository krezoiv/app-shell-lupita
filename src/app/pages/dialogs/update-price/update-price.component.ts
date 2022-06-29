import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fuels } from 'src/app/models/infrastructure.model';

@Component({
  selector: 'app-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.css']
})
export class UpdatePriceComponent implements OnInit {

  updatePriceForm! : FormGroup;
  //public costPrice! : number;
  //public salePrice! : number;
  
  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public fuels : Fuels,
    private dialogRef : MatDialogRef<UpdatePriceComponent>,
  
  ) { 
    
  }

  ngOnInit(): void {

    this.updatePriceForm = this.fb.group({
      fuelName : ['', Validators.required],
      costPrice : ['', Validators.required],
      salePrice : ['', Validators.required]
    })

    if(this.fuels){
      this.updatePriceForm.controls['fuelName'].setValue(this.fuels.fuelName);
      this.updatePriceForm.controls['costPrice'].setValue(this.fuels.costPrice);
      this.updatePriceForm.controls['salePrice'].setValue(this.fuels.salePrice);
    }
  }


  updatePrice(){
    console.log(this.updatePriceForm.value);
  }

}
