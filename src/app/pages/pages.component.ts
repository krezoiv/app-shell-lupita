import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  @Input() userName!: string
  
  constructor() { }

  ngOnInit(): void {
  }

}
