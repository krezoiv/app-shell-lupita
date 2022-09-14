import { Component, OnInit } from '@angular/core';
import { Fuels } from 'src/app/models/infrastructure.model';
import { FuelsService } from 'src/app/services/fuelstation/fuels.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  public fuelSelected: Fuels[] = [];
  constructor(
    private _fuelService : FuelsService

  ) { }

  ngOnInit(): void {
    this.getFuels();
  }

getFuels(){
  this._fuelService.getFuelsActive()
      .subscribe(({ fuels }) => {
        this.fuelSelected = fuels
      });
}

}
