import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  title ="Shell Lupita"
  opened = false;
  constructor() { }

  ngOnInit(): void {
  }

}
