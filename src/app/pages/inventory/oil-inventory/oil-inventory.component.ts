import { Component, OnInit } from '@angular/core';
import { LubricantsInventory } from 'src/app/models/lubricantInventory.models';
import { LubricantsInventoryService } from 'src/app/services/lubricants/lubricants-inventory.service';

@Component({
  selector: 'app-oil-inventory',
  templateUrl: './oil-inventory.component.html',
  styleUrls: ['./oil-inventory.component.css']
})
export class OilInventoryComponent implements OnInit {

  public inventory : LubricantsInventory[] =[];
  constructor(
    private _lubricantService : LubricantsInventoryService
  ) { }

  ngOnInit(): void {
    this.getLubricantInventory();
  }
  getLubricantInventory(){
    this._lubricantService.getLubricantsInventory()
      .subscribe(({lubricantInventory}) => {
        console.log(lubricantInventory)
        this.inventory = lubricantInventory
      })
  }

}
