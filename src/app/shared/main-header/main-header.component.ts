import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Users } from 'src/app/models/user.models';
import { UpdatePasswordComponent } from 'src/app/pages/dialogs/users/update-password/update-password.component';
import { AuthService } from 'src/app/services/auth.service';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  salesControlForm: FormGroup = this.fb.group({
    userId :[],
   
  })
  
  public user!: Users;
  
  title ="Shell Lupita"
  opened = false;
  element!: Users;
  constructor(
    private authService : AuthService,
    private fb: FormBuilder,
    private dialog : MatDialog
  ) {
    this.user = authService.usuario
   }

   date: number = Date.now();
  hour: any
  ngOnInit(): void {
    this.showHour();
  }


  logout() {
   this.authService.logOut();
  }

  changePass(){

  }

  showHour() {
    this.hour = new Date();

    setInterval(() => {
      this.hour = new Date();
    }, 1000);
  }

  openDialogUpdatePass(element : Users){
    this.dialog.open(UpdatePasswordComponent, {
      width : '30%',
      data: element
    })
  }

}
