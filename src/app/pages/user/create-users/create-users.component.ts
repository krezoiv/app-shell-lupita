import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/models/status.model';
import { Roles } from 'src/app/models/user.models';

import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  public formSubmitted = false;
  selectedRoles: Roles[] =[];
  selectedStatus : Status[] =[];

  newUserForm : FormGroup = this.fb.group({

    firstName: [ '', Validators.required],
    lastName: [ '', Validators.required],
    email: [ '', Validators.required],
    password: [ '', Validators.required],
    rolesId: [ '', Validators.required],
    statusId: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private userService : UsersService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getStatus();
  }

  getRoles(){
    this.userService.getRoles()
        .subscribe(({roles}) => {
          this.selectedRoles = roles
        });
  };

  getStatus(){
    this.userService.getStatus()
        .subscribe(({status}) => {
          this.selectedStatus = status
          console.log(status)
        });
  };
  

  createUser(){
    const{firstName, lastName} =this.newUserForm.value;
    this.userService.createUser(this.newUserForm.value)
        .subscribe( data => {
          Swal.fire('Exitoso', `${firstName} ${lastName} creado correctamente`)
          
        }, err => {
          Swal.fire('Error', err.error.msg, 'error')
        })
  }

};
