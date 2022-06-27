import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status.model';
import { Roles, Users } from 'src/app/models/user.models';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public users : Users[]=[];
  public rolUser : Roles[]=[];
  public statusUser : Status[]=[];

  constructor(
    private userService : UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    
      this.userService.getUsers()
            .subscribe(({users}) => {
              this.users = users
             
            })
  }


  deleteUser(){
    Swal.fire({
      title: '¿Borrar Usuario?',
      text:'Esta por eliminar',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar !!'
    }).then((result) => {
      if(result.value){
        this.userService.deleteUser()
        .subscribe(resp => {
          this.getUsers();
          Swal.fire(
            'Usuario Eliminado',
            'fue eliminado', 'success'
          );
        })
      }
    })
  }

}
