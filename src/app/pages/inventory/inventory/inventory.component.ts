import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuelInventory } from 'src/app/models/fuelstation/fuelInventory.model';
import { Fuels } from 'src/app/models/infrastructure.model';
import { FuelInventoryService } from 'src/app/services/fuelstation/fuel-inventory.service';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {


availabeRegular ! : Number
availabeDiesel ! : Number
availabeSuper ! : Number

porcentualRegular! : Number
porcentualSuper! : Number
porcentualDiesel! : Number


inventoryForm: FormGroup = this.fb.group({
  inventoryCode : ['']
  
})

  public fuelSelected: Fuels[] = [];
  public inventory: FuelInventory[] = [];
  constructor(
    private _fuelService : FuelsService,
    private _inventoryService : FuelInventoryService,
    private fb: FormBuilder,
    

  ) { }

  ngOnInit(): void {
    
    this.getFuels();
    this.getInventory();
    this.getAvailableRegular();
    this.getAvailableSuper();
    this.getAvailableDiesel();

  
  }


  // gets fuel
getFuels(){
  this._fuelService.getFuelsActive()
      .subscribe(({ fuels }) => {
        this.fuelSelected = fuels
      });
}

//gt all inventory
getInventory(){
  this._inventoryService.getInventoryData()
    .subscribe(({fuelInventory}) => {
      this.inventory = fuelInventory

    })
}

//get availables
getAvailableRegular() {
  this.inventoryForm.controls['inventoryCode'].setValue('t-r1');
  this._inventoryService.getFuelInventoryAvailableCode(this.inventoryForm.value)
    .subscribe(({ fuelInventoryAvailable }) => {
    this.availabeRegular = (fuelInventoryAvailable.available * 100) /3000
    });
};

//get availables
getAvailableSuper() {
  this.inventoryForm.controls['inventoryCode'].setValue('t-s1');
  this._inventoryService.getFuelInventoryAvailableCode(this.inventoryForm.value)
    .subscribe(({ fuelInventoryAvailable }) => {
    this.availabeSuper =  (fuelInventoryAvailable.available * 100) /5000
    });

    
};

//get availables
getAvailableDiesel() {
  this.inventoryForm.controls['inventoryCode'].setValue('t-d1');
  this._inventoryService.getFuelInventoryAvailableCode(this.inventoryForm.value)
    .subscribe(({ fuelInventoryAvailable }) => {
    this.availabeDiesel =  (fuelInventoryAvailable.available * 100) /3000
    });
};


}
