import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Status } from 'src/app/models/status.model'; 
import { UpdatePriceComponent } from 'src/app/pages/dialogs/update-price/update-price.component';
import { InfrastructuresService } from 'src/app/services/infrastructures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-fuels',
  templateUrl: './list-fuels.component.html',
  styleUrls: ['./list-fuels.component.css']
})
export class ListFuelsComponent implements OnInit {

  public fuels : Fuels[]=[];
  public statusFuel : Status[]=[];
  public columns : string[] =['fuelName', 'costPrice', 'salePrice', 'statusId', 'accions'];
  

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort

  constructor(
    private infrastructureService : InfrastructuresService,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {

    this.getFuels();
  }

  getFuels(){
    
    this.infrastructureService.getFuels()
          .subscribe(({fuels}) => {
           this.fuels = fuels         
          })
}

async updatePrice(){
  const { value: formValues } = await Swal.fire({
    title: 'Ingrese los Nuevos Precios',
    html:
      
      '<a>Precio Costo</a>'+
      '<input id="swal-input1" class="swal2-input">'+
      '<a>Precio Público</a>'+
      '<input id="swal-input2" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        
      ]
    }
  })
  
  if (formValues) {
    Swal.fire(JSON.stringify(formValues))
  }
}


openDialog() {
  this.dialog.open(UpdatePriceComponent, {
    width: '30%',
   
  });
}

editPrice( fl : any){
  this.dialog.open(UpdatePriceComponent, {
   width: '30px',
   
  })
}


}



