import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Status } from 'src/app/models/status.model';
import { TanksService } from 'src/app/services/fuelstation/tanks.service';
import { StatusService } from 'src/app/services/functions/status.service';
import { InfrastructuresService } from 'src/app/services/infrastructures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-tanks',
  templateUrl: './create-tanks.component.html',
  styleUrls: ['./create-tanks.component.css']
})
export class CreateTanksComponent implements OnInit {

  selectedStatus : Status[]=[];
  selectedFuel : Fuels[]=[];

  newTankForm : FormGroup = this.fb.group({
    tankName : ['', Validators.required],
    maxStorage : ['', Validators.required],
    gallonsStoraged : ['', Validators.required],
    fuelId : ['', Validators.required],
    statusId: ['', Validators.required]

  })
  constructor(
    private rotuer : Router,
    private fb : FormBuilder,
    private infrastructureService : InfrastructuresService,
    private tankService : TanksService,
    private statusService : StatusService
  ) { }

  ngOnInit(): void {

    this.getFuels();
    this.getStatus();
  }

  getFuels (){
    this,this.infrastructureService.getFuels()
        .subscribe(({fuels})=> {
          this.selectedFuel = fuels
        });
  };

  getStatus(){
    this.statusService.getStatus()
        .subscribe(({status})=> {
          this.selectedStatus = status
        });
  };

  createFuelTank(){
    const {tankName} = this.newTankForm.value;
   this.tankService.createTank(this.newTankForm.value)
        .subscribe(data => {
          Swal.fire('Exitoso', `${tankName} creado correctamente`);
          this.newTankForm.reset();
          this.rotuer.navigateByUrl('/dashboard/infrastructure/tanks/listTanks');
        })

      

  }


}
