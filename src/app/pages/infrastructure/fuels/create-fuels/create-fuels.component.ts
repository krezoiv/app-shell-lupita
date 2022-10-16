import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Status } from 'src/app/models/status.model';
import { InfrastructuresService } from 'src/app/services/infrastructures.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import {FuelsService} from 'src/app/services/fuelstation/fuels.service'
import { Taxes } from 'src/app/models/purchase/taxes.model';

@Component({
  selector: 'app-create-fuels',
  templateUrl: './create-fuels.component.html',
  styleUrls: ['./create-fuels.component.css']
})
export class CreateFuelsComponent implements OnInit {

  public FormSubmitted = false;
  selectedStatus : Status[]=[];
  selectedTaxes : Taxes[]=[];

  newFuelForm : FormGroup = this.fb.group({
    fuelName: [ '', Validators.required],
    costPrice: [ '', Validators.required],
    salePrice: [ '', Validators.required],
    statusId: [ '', Validators.required],
    taxesId: [ '', Validators.required],
    
  })

  constructor(
    private router : Router,
    private fb: FormBuilder,
    private infrastructureService : InfrastructuresService,
    private userService : UsersService,
    private fuelService : FuelsService
    
  ) { }

  ngOnInit(): void {
    this.getStatus();
    this.getTaxes();
  }

  getTaxes(){
    this.fuelService.getTaxes()
          .subscribe(({taxes}) => {
          this.selectedTaxes = taxes
      })
  }

  getStatus(){
    this.userService.getStatus()
        .subscribe(({status}) => {
          this.selectedStatus = status
        });
  };

  createFuel(){
    const { fuelName } = this.newFuelForm.value;    

    this.infrastructureService.createFuel(this.newFuelForm.value)
          .subscribe( data => {
            Swal.fire('Exitoso', `${fuelName} creado correctamente`);
            this.newFuelForm.reset();
            this.router.navigateByUrl('/dashboard/infrastructura/combustibles/listado-combustibles');
          }, err => {
            Swal.fire('Error', err.error.msg, 'error')
          });
  };

};
