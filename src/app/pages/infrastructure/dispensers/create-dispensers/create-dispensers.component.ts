import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Island } from 'src/app/models/fuelstation/island.models';
import { Status } from 'src/app/models/status.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';
import { StatusService } from 'src/app/services/functions/status.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-dispensers',
  templateUrl: './create-dispensers.component.html',
  styleUrls: ['./create-dispensers.component.css']
})
export class CreateDispensersComponent implements OnInit {
  selectedStatus : Status[]=[];
  selectedIsland : Island[]=[];

  dispenserForm : FormGroup = this.fb.group({
    dispenserCode : ['', Validators.required],
    islandId : ['', Validators.required],
    statusId : ['', Validators.required]
  })

  constructor(

    private fb : FormBuilder,
    private router : Router,
    private statusService : StatusService,
    private islandService : IslandsService,
    private dispenserService : DispensersService
  ) { }

  ngOnInit(): void {
    this.getIsland();
    this.getStatus();
  }

  getIsland(){
    this.islandService.getIslands()
        .subscribe(({island}) => {
          this.selectedIsland = island
        });
  };

  getStatus(){
    this.statusService.getStatus()
        .subscribe(({status})=> {
          this.selectedStatus = status

        });
  };
 
  createDispenser(){

   this.dispenserService.createDispenser(this.dispenserForm.value)
        .subscribe( data => {
          Swal.fire('Exitoso', 'creado correctamente');
          this.dispenserForm.reset();
          this.router.navigateByUrl('/dashboard/dispensadores/listado-dispensadores');
        }, err => {
          Swal.fire('Error', err.error.msg, 'error')
        
        })
  }

}
