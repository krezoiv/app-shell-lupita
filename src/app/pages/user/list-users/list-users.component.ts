import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Status } from 'src/app/models/status.model';
import { Roles, Users } from 'src/app/models/user.models';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { UpdateUsersComponent } from '../../dialogs/users/update-users/update-users.component';

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
    private userService : UsersService, 
    private dialog : MatDialog
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

 


}
