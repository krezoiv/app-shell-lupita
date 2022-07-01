import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status } from 'src/app/models/status.model';
import { Island } from 'src/app/models/fuelstation/island.models';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';
import { UpdateIslandComponent } from 'src/app/pages/dialogs/fuels/update-island/update-island.component';
import { DeleteIslandComponent } from 'src/app/pages/dialogs/fuels/delete-island/delete-island.component';

@Component({
  selector: 'app-list-island',
  templateUrl: './list-island.component.html',
  styleUrls: ['./list-island.component.css']
})
export class ListIslandComponent implements OnInit {

  public islands : Island[]=[];
  public statusIsland : Status[]=[];
  public columns : string[]=['islandNumber', 'statusId', 'accions'];


  constructor(
    private islandService : IslandsService,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.getIslands();
  }

  getIslands(){
    this.islandService.getIslands()
      .subscribe(({ island }) => {
        this.islands = island
        console.log(island)
      })
  }

  openDialogUpdate(element: Island) {
    this.dialog.open(UpdateIslandComponent, {
      width: '30%',
      data: element

    })

  }


  openDialogDelete(element: Island) {
    this.dialog.open(DeleteIslandComponent, {
      width: '30%',
      data: element

    })

  }
}
