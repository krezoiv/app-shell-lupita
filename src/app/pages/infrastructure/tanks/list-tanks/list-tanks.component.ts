import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuelTanks } from 'src/app/models/fuelstation/tanks.model';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Status } from 'src/app/models/status.model';
import { DeleteTankDialogComponent } from 'src/app/pages/dialogs/tanks/delete-tank-dialog/delete-tank-dialog.component';
import { UpdateTankDialogComponent } from 'src/app/pages/dialogs/tanks/update-tank-dialog/update-tank-dialog.component';
import { TanksService } from 'src/app/services/fuelstation/tanks.service';

@Component({
  selector: 'app-list-tanks',
  templateUrl: './list-tanks.component.html',
  styleUrls: ['./list-tanks.component.css']
})
export class ListTanksComponent implements OnInit {

  public tank : FuelTanks[]=[];
  public statusTank : Status[]=[];
  public fuelTank : Fuels[]=[];
  public columns : string[]=['tankName', 'maxStorage', 'gallonsStoraged', 'fuelId', 'statusId', 'accions'];

  constructor(
    private tankService : TanksService,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {

    this.getTanks();
  }

  getTanks(){
    this.tankService.getTanks()
        .subscribe(({fuelTank}) => {
          this.tank = fuelTank
          console.log(fuelTank)
        })
  }


  openDialogUpdate(element: FuelTanks) {
    this.dialog.open(UpdateTankDialogComponent, {
      width: '30%',
      data: element

    })

  }


  openDialogDelete(element: FuelTanks) {
    this.dialog.open(DeleteTankDialogComponent, {
      width: '30%',
      data: element

    })

  }


}
