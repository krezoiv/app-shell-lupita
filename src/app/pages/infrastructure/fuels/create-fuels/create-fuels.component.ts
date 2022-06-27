import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Status } from 'src/app/models/status.model';
import { InfrastructuresService } from 'src/app/services/infrastructures.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-fuels',
  templateUrl: './create-fuels.component.html',
  styleUrls: ['./create-fuels.component.css']
})
export class CreateFuelsComponent implements OnInit {

  public FormSubmitted = false;
  selectedStatus : Status[]=[];

  newFuelForm : FormGroup = this.fb.group({
    fuelName: [ '', Validators.required],
    costPrice: [ '', Validators.required],
    salePrice: [ '', Validators.required],
    StatusId: [ '', Validators.required],
    
  })

  constructor(
    private fb: FormBuilder,
    private infrastructureService : InfrastructuresService,
    private userService : UsersService
    
  ) { }

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus(){
    this.userService.getStatus()
        .subscribe(({status}) => {
          this.selectedStatus = status
          console.log(status)
        });
  };

  createFuel(){
    
  }

}
