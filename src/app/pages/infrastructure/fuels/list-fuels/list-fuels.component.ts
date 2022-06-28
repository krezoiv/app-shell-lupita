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


}
