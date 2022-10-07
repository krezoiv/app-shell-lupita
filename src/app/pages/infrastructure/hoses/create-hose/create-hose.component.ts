import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Fuels } from 'src/app/models/infrastructure.model';
import { Status } from 'src/app/models/status.model';
import { HosesService } from 'src/app/services/fuelstation/hoses.service';
import { StatusService } from 'src/app/services/functions/status.service';
import { InfrastructuresService } from 'src/app/services/infrastructures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-hose',
  templateUrl: './create-hose.component.html',
  styleUrls: ['./create-hose.component.css']
})
export class CreateHoseComponent implements OnInit {
  
  selectedStatus: Status[]=[];
  selectedFuel : Fuels[] = [];

  hoseForm : FormGroup = this.fb.group({
    hoseColor : ['', Validators.required],
    fuelId : ['', Validators.required],
    statusId : ['', Validators.required]

})

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private statusService : StatusService,
    private infrastructureService : InfrastructuresService,
    private hoseService : HosesService
  ) { }

  ngOnInit(): void {
    this.getStatus();
    this.getFuels();
  }

  getStatus() {
    this.statusService.getStatus()
      .subscribe(({ status }) => {
        this.selectedStatus = status
      });
  };

  getFuels(){
    this.infrastructureService.getFuelsActive() 
        .subscribe(({fuels})=> {
          this.selectedFuel = fuels
          console.log(fuels)
        });
  };

  createHose(){

    this.hoseService.createHose(this.hoseForm.value)
        .subscribe(data =>{
          Swal.fire('Exitoso', 'creado correctamente');
          this.hoseForm.reset();
          this.router.navigateByUrl('/dashboard/infrastructura/manguera/listar-mangueras');
        }, err => {
          Swal.fire('Error', err.error.msg, 'error')
        });

  }



}
