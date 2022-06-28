import { Component, OnInit } from '@angular/core';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Status } from 'src/app/models/status.model'; 
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

  constructor(
    private infrastructureService : InfrastructuresService
  ) { }

  ngOnInit(): void {

    this.getFuels();
  }

  getFuels(){
    
    this.infrastructureService.getFuels()
          .subscribe(({fuels}) => {
            this.fuels = fuels
            console.log(fuels)
           
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


}
