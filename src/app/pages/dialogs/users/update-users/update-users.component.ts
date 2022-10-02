import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Roles_I } from 'src/app/interfaces/users.interface';
import { Users } from 'src/app/models/user.models';


@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {

  updateUserForm! : FormGroup;
  roles : Roles_I[]=[
    {roleId: 'ADMIN_ROLE', roleName : 'ADMIN_ROLE'},
    {roleId: 'SUPER_ROLE', roleName : 'SUPER_ROLE'},
    {roleId: 'USER_ROLE', roleName : 'USER_ROLE'},
    {roleId: 'GUEST_ROLE', roleName : 'GUEST_ROLE'}
    
  ]

 

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public user : Users,
    private dialogRef : MatDialogRef<UpdateUsersComponent>
  ) { }

  ngOnInit(): void {
 
    this.updateUserForm = this.fb.group({

      firstName: [ '', Validators.required],
      lastName: [ '', Validators.required],
      email: [ '', Validators.required],
      password: [ '', Validators.required],
      roleId: [ '', Validators.required],
      statusId: ['', Validators.required],
      userId : []
    })
    if(this.user){
      this.updateUserForm.controls['userId'].setValue(this.user.userId);
      this.updateUserForm.controls['firstName'].setValue(this.user.firstName);
      this.updateUserForm.controls['lastName'].setValue(this.user.lastName);
    }

    console.log(this.updateUserForm.value)
  }

  updateUser(){}
}
