import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { updatePriceFuel_I } from 'src/app/interfaces/infrastructure.interface';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Status } from 'src/app/models/status.model';
import { UpdatePriceComponent } from 'src/app/pages/dialogs/fuels/update-price/update-price.component';
import { InfrastructuresService } from 'src/app/services/infrastructures.service';
import Swal from 'sweetalert2';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteFuelDialogComponent } from 'src/app/pages/dialogs/fuels/delete-fuel-dialog/delete-fuel-dialog.component';
import { UpdateFuelDialogComponent } from 'src/app/pages/dialogs/fuels/update-fuel-dialog/update-fuel-dialog.component';

@Component({
  selector: 'app-list-fuels',
  templateUrl: './list-fuels.component.html',
  styleUrls: ['./list-fuels.component.css']
})
export class ListFuelsComponent implements OnInit {

  public fuels: Fuels[] = [];
  public statusFuel: Status[] = [];
  public columns: string[] = ['fuelName', 'idpAmount', 'costPrice', 'salePrice', 'statusId', 'accions'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  constructor(

    private infrastructureService: InfrastructuresService,
    private dialog: MatDialog,
    //private router: Router,
  ) { }

  ngOnInit(): void {

    this.getFuels();
  }

  getFuels() {

    this.infrastructureService.getFuels()
      .subscribe(({ fuels }) => {
        this.fuels = fuels
      })
  }


  openDialog(element: Fuels) {
    this.dialog.open(UpdatePriceComponent, {
      width: '30%',
      data: element

    })

  }

  openDialogDelete(element : Fuels){
    this.dialog.open(DeleteFuelDialogComponent,{
      width:'30%',
      data: element
    
    })

  }

  openDialogUpdate(element : Fuels){
    this.dialog.open(UpdateFuelDialogComponent,{
      width:'30%',
      data: element
    
    })
  }
   
}



