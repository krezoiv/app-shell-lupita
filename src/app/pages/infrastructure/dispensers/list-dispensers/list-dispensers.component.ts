import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dispensers } from 'src/app/models/fuelstation/dispensers.interface';
import { Island } from 'src/app/models/fuelstation/island.models';
import { Status } from 'src/app/models/status.model';
import { DeleteDispenserDialogComponent } from 'src/app/pages/dialogs/dispensers/delete-dispenser-dialog/delete-dispenser-dialog.component';
import { UpdateDispenserDialogComponent } from 'src/app/pages/dialogs/dispensers/update-dispenser-dialog/update-dispenser-dialog.component';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';
import { StatusService } from 'src/app/services/functions/status.service';

@Component({
  selector: 'app-list-dispensers',
  templateUrl: './list-dispensers.component.html',
  styleUrls: ['./list-dispensers.component.css']
})
export class ListDispensersComponent implements OnInit {

  public dispensers : Dispensers[]=[];
  public status : Status[]=[];
  public island : Island[]=[];
  public columns : string[] =['dispenserCode', 'islandId', 'statusId', 'accions'];

  constructor(
    private dispenserService : DispensersService,
    private islandService : IslandsService,
    private statusService : StatusService,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {

    this.getDispensers();
  }

  getDispensers(){
    this.dispenserService.getDIspensers()
        .subscribe(({dispenser}) =>{
          this.dispensers = dispenser
          console.log(dispenser)

        })
  }

  
  openDialogDelete(element : Dispensers){
    this.dialog.open(DeleteDispenserDialogComponent,{
      width:'30%',
      data: element
    
    })

  }

  openDialogUpdate(element : Dispensers){
    this.dialog.open(UpdateDispenserDialogComponent,{
      width:'30%',
      data: element
    
    })
  }

 

}
