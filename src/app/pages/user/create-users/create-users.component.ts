import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles_I } from 'src/app/interfaces/users.interface';
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

  roles : Roles_I[]=[
    {roleId: 'ADMIN_ROLE', roleName : 'ADMIN_ROLE'},
    {roleId: 'SUPER_ROLE', roleName : 'SUPER_ROLE'},
    {roleId: 'USER_ROLE', roleName : 'USER_ROLE'},
    {roleId: 'GUEST_ROLE', roleName : 'GUEST_ROLE'}
    
  ]

  public formSubmitted = false;
  selectedRoles: Roles[] =[];
  selectedStatus : Status[] =[];

  newUserForm : FormGroup = this.fb.group({

    firstName: [ '', Validators.required],
    lastName: [ '', Validators.required],
    email: [ '', Validators.required],
    password: [ '', Validators.required],
    roleId: [ '', Validators.required],
    statusId: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private userService : UsersService,
    private router: Router
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
  

  createUser(){
    const{firstName, lastName} =this.newUserForm.value;
    this.userService.createUser(this.newUserForm.value)
        .subscribe( data => {
          Swal.fire('Exitoso', `${firstName} ${lastName} creado correctamente`)
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/dashboard/usuario/agregar-usuario']);
          });
        }, err => {
          Swal.fire('Error', err.error.msg, 'error')
        })
  }



};
