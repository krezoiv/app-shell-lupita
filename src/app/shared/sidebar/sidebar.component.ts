import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  title = "Sell Lupita";
  opened = true;

  constructor(
    private  authService : AuthService
  ) { }

  date : number = Date.now();
  hour : any
  ngOnInit(): void {
    this.showHour();
  }

  logOut(){
    this.authService.logOut();
  }

  showHour(){
    this.hour = new Date();
   
    setInterval(() => {
      this.hour = new Date();
    },1000);
  }

}
