import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  title = "Sell Lupita";
  opened = false;

  constructor(
    private  authService : AuthService
  ) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logOut();
  }

}
