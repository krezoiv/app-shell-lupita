import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles_I } from 'src/app/interfaces/users.interface';
import { Status } from 'src/app/models/status.model';
import { Roles, Users } from 'src/app/models/user.models';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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

  public user! : Users;
  selectedRoles: Roles[] =[];
  selectedStatus : Status[] =[];
  selectedUsers: Users[]=[];
  updateUserForm : FormGroup = this.fb.group({

    firstName: [ '', Validators.required],
    lastName: [ '', Validators.required],
    email: [ '', Validators.required],
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
   
  }

  getStatus(){
    this.userService.getStatus()
        .subscribe(({status}) => {
          this.selectedStatus = status
        
        });
  };

  getUserByName(){
    this.userService.getUserByName(this.updateUserForm.value)
      .subscribe((users) => {
        
        this.updateUserForm.controls['firstName'].setValue(users.users.firstName);
        this.updateUserForm.controls['lastName'].setValue(users.users.lastName);
        this.updateUserForm.controls['email'].setValue(users.users.email);
        this.updateUserForm.controls['roleId'].setValue(users.users.roleId);
        this.updateUserForm.controls['statusId'].setValue(users.users.statusId.statusName);
        this.updateUserForm.controls['userId'].setValue(users.users.userId);     
      })
  }

  upadateUser(){
    
    Swal.fire({
      title: 'Desea eliminar registros?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updateUsers(this.updateUserForm.value)
        .subscribe(data => {

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Usuario modificado',
              showConfirmButton: false,
              timer: 1500
            })
           this.newSearch();
          }, error => {
            Swal.fire('Error', error.error.msg, 'error')
          })
      } else if (result.isDenied) {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'Proceso Cancelado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }

  deleteUser(){
    Swal.fire({
      title: 'Desea eliminar registros?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.updateUserForm.value)
        .subscribe(data => {

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Usuario eliminado',
              showConfirmButton: false,
              timer: 1500
            })
           this.newSearch();
          }, error => {
            Swal.fire('Error', error.error.msg, 'error')
          })
      } else if (result.isDenied) {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'Proceso Cancelado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }
 
  search(){
    this.getUserByName();
  }


  newSearch(){
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard/usuario/editar-usuario']);
    });
  }
}
