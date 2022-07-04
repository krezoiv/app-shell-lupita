import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hoses } from 'src/app/models/fuelstation/hoses.models';
import { DeleteHosesComponent } from 'src/app/pages/dialogs/hoses/delete-hoses/delete-hoses.component';
import { UpdateHosesComponent } from 'src/app/pages/dialogs/hoses/update-hoses/update-hoses.component';
import { HosesService } from 'src/app/services/fuelstation/hoses.service';

@Component({
  selector: 'app-list-hose',
  templateUrl: './list-hose.component.html',
  styleUrls: ['./list-hose.component.css']
})
export class ListHoseComponent implements OnInit {

  public hoses: Hoses[]=[];
  public columns : string[]= ['hoseColor', 'fuelId', 'statusId', 'accions'];

  constructor(
    private hosesService : HosesService,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {

    this.getHoses();
  }

  getHoses(){
    this.hosesService.getHoses()  
        .subscribe(({hoses})=>{
          this.hoses = hoses
        });
  };


  
  openDialogUpdate(element: Hoses) {
    this.dialog.open(UpdateHosesComponent, {
      width: '30%',
      data: element

    });

  };


  openDialogDelete(element: Hoses) {
    this.dialog.open(DeleteHosesComponent, {
      width: '30%',
      data: element

    });

  };



};
