import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles_I } from 'src/app/interfaces/users.interface';
import { Status } from 'src/app/models/status.model';
import { Roles, Users } from 'src/app/models/user.models';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  roles : Roles_I[]=[
    {roleId: 'ADMIN_ROLE', roleName : 'ADMIN_ROLE'},
    {roleId: 'SUPER_ROLE', roleName : 'SUPER_ROLE'},
    {roleId: 'USER_ROLE', roleName : 'USER_ROLE'},
    {roleId: 'GUEST_ROLE', roleName : 'GUEST_ROLE'}
    
  ]

  selectedRoles: Roles[] =[];
  selectedStatus : Status[] =[];
  selectedUsers: Users[]=[];
  updateUserForm : FormGroup = this.fb.group({

    firstName: [ 'Erick', Validators.required],
    lastName: [ '', Validators.required],
    email: [ '', Validators.required],
    password: [ '', Validators.required],
    roleId: [ '', Validators.required],
    statusId: ['', Validators.required],
    userId: ['']
  })
  constructor(
    private fb: FormBuilder,
    private userService : UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStatus();
    this.getUserByName();
  }

  getStatus(){
    this.userService.getStatus()
        .subscribe(({status}) => {
          this.selectedStatus = status
          console.log(status)
        });
  };

  getUserByName(){
    this.userService.getUserByName(this.updateUserForm.value)
      .subscribe((users) => {
        
        this.updateUserForm.controls['firstName'].setValue(users.users.firstName);
        this.updateUserForm.controls['lastName'].setValue(users.users.lastName);
        this.updateUserForm.controls['email'].setValue(users.users.email);
        this.updateUserForm.controls['password'].setValue(users.users.password);
        this.updateUserForm.controls['roleId'].setValue(users.users.roleId);
        this.updateUserForm.controls['statusId'].setValue(users.users.statusId.statusName);
        this.updateUserForm.controls['userId'].setValue(users.users.userId);
      
      })
  }

}
