import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Users } from 'src/app/models/user.models';
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
    passwordA : [],
    passwordB : [],
    password :[]
  })
  
  public user!: Users;
  
  title ="Shell Lupita"
  opened = false;
  constructor(
    private authService : AuthService,
    private fb: FormBuilder,
  ) {
    this.user = authService.usuario
   }

   date: number = Date.now();
  hour: any
  ngOnInit(): void {
    this.showHour();
  }


  logout() {
   
    
  this.salesControlForm.controls['userId'].setValue(this.user.statusId);
  
  }

  showHour() {
    this.hour = new Date();

    setInterval(() => {
      this.hour = new Date();
    }, 1000);
  }

  

}
