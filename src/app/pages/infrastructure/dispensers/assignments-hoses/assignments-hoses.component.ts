import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hoses, SideDispenser } from 'src/app/models/fuelstation/hoses.models';
import { Status } from 'src/app/models/status.model';
import {Observable, Observer} from 'rxjs';



@Component({
  selector: 'app-assignments-hoses',
  templateUrl: './assignments-hoses.component.html',
  styleUrls: ['./assignments-hoses.component.css']
})
export class AssignmentsHosesComponent implements OnInit {

color= 'accent'

  selectedStatus : Status[]=[]; 
  selectedHose : Hoses[] =[];
  selectedSide : SideDispenser[] =[];
  public columns : string[]=['sideA', 'sideB']

  assignmentForm : FormGroup = this.fb.group({
    hosesId : ['', Validators.required],
    statusId : ['', Validators.required],
    position : ['', Validators.required],

    hosesId2 : ['', Validators.required],
    statusId2 : ['', Validators.required],
    position2 : ['', Validators.required],

    hosesId3 : ['', Validators.required],
    statusId3 : ['', Validators.required],
    position3 : ['', Validators.required],

    hosesId4 : ['', Validators.required],
    statusId4 : ['', Validators.required],
    position4 : ['', Validators.required],

    assignmentId : ['', Validators.required],
    dispenserId : ['', Validators.required]

  })

  constructor(
    private router : Router,
    private fb : FormBuilder,
  ) { 
/*
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'Lado A', content: 'Prueba'},
          {label: 'Lado B', content: 'Content 2'},
        ]);
      }, 1000);
    });*/
  }

  ngOnInit(): void {
  }

  save(){

    console.log('hello world')
  }

}
