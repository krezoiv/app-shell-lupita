import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hoses, SideDispenser } from 'src/app/models/fuelstation/hoses.models';
import { Status } from 'src/app/models/status.model';
import { HosesService } from 'src/app/services/fuelstation/hoses.service';
import { StatusService } from 'src/app/services/functions/status.service';
import { Dispensers } from 'src/app/models/fuelstation/dispensers.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import Swal from 'sweetalert2';
import { Assignment } from 'src/app/models/fuelstation/assignment.model';



@Component({
  selector: 'app-assignments-hoses',
  templateUrl: './assignments-hoses.component.html',
  styleUrls: ['./assignments-hoses.component.css']
})
export class AssignmentsHosesComponent implements OnInit {

color= 'accent'
 
public sideA2 = '';
public sdeB ='';
  selectedStatus : Status[]=[]; 
  selectedHose : Hoses[] =[];
  selectedSideA : SideDispenser[] =[];
  selectedSideB : SideDispenser[] =[];
  selectedDispenser : Dispensers[]=[];
  selectedassignments : Assignment[]=[];
 
  public columns : string[]=['sideA', 'sideB']

  assignmentForm : FormGroup = this.fb2.group({
    dispenser : ['', Validators.required],
  })

  assignmentHoseForm : FormGroup = this.fb.group({
    hosesId : [''],
    statusId : ['', Validators.required],
    position : ['1', Validators.required],

    hosesId2 : [''],
    statusId2 : ['', Validators.required],
    position2 : ['2', Validators.required],

    hosesId3 : [''],
    statusId3 : [''],
    position3 : ['3', Validators.required],

    hosesId4 : [''],
    statusId4 : ['', Validators.required],
    position4 : ['4', Validators.required],

    hosesId5 : [''],
    statusId5 : ['', Validators.required],
    position5 : ['1', Validators.required],

    hosesId6 : [''],
    statusId6 : ['', Validators.required],
    position6 : ['2', Validators.required],

    hosesId7 : [''],
    statusId7 : ['', Validators.required],
    position7 : ['3', Validators.required],

    hosesId8 : [''],
    statusId8 : ['', Validators.required],
    position8 : ['4', Validators.required],

    assignmentId : ['', Validators.required],
    dispenserId : ['', Validators.required],
    dispenserSide : ['', Validators.required]

  })

  constructor(
    private router : Router,
    private fb : FormBuilder,
    private fb2 : FormBuilder,
    private hoseService : HosesService,
    private statusService : StatusService,
    private dispenserService : DispensersService,
 

   
  ) { }

  ngOnInit(): void {
    this.disableForm();
    this.getHose();
    this.getStatus();
    this.getDispenser();
    

  }

  getDispenser(){
    this.dispenserService.getDIspensers()
      .subscribe(({dispenser}) => {
        this.selectedDispenser = dispenser
      })
  }

  getStatus(){
    this.statusService.getStatus()
        .subscribe(({status})=> {
          this.selectedStatus = status

        });
  };

  getHose(){
    this.hoseService.getHosesActive()
      .subscribe(({hoses})=> {
        this.selectedHose = hoses
       
      })
  }

  enableForm(){
    this.assignmentHoseForm.get('hosesId')?.enable();
    this.assignmentHoseForm.get('statusId')?.enable();
    this.assignmentHoseForm.get('hosesId2')?.enable();
    this.assignmentHoseForm.get('statusId2')?.enable();
    this.assignmentHoseForm.get('hosesId3')?.enable();
    this.assignmentHoseForm.get('statusId3')?.enable();
    this.assignmentHoseForm.get('hosesId4')?.enable();
    this.assignmentHoseForm.get('statusId4')?.enable();
    this.assignmentHoseForm.get('hosesId5')?.enable();
    this.assignmentHoseForm.get('statusId5')?.enable();
    this.assignmentHoseForm.get('hosesId6')?.enable();
    this.assignmentHoseForm.get('statusId6')?.enable();
    this.assignmentHoseForm.get('hosesId7')?.enable();
    this.assignmentHoseForm.get('statusId7')?.enable();
    this.assignmentHoseForm.get('hosesId8')?.enable();
    this.assignmentHoseForm.get('statusId8')?.enable();
 
    
  }

  disableForm(){
    this.assignmentHoseForm.get('hosesId')?.disable();
    this.assignmentHoseForm.get('statusId')?.disable();
    this.assignmentHoseForm.get('hosesId2')?.disable();
    this.assignmentHoseForm.get('statusId2')?.disable();
    this.assignmentHoseForm.get('hosesId3')?.disable();
    this.assignmentHoseForm.get('statusId3')?.disable();
    this.assignmentHoseForm.get('hosesId4')?.disable();
    this.assignmentHoseForm.get('statusId4')?.disable();
    this.assignmentHoseForm.get('hosesId5')?.disable();
    this.assignmentHoseForm.get('statusId5')?.disable();
    this.assignmentHoseForm.get('hosesId6')?.disable();
    this.assignmentHoseForm.get('statusId6')?.disable();
    this.assignmentHoseForm.get('hosesId7')?.disable();
    this.assignmentHoseForm.get('statusId7')?.disable();
    this.assignmentHoseForm.get('hosesId8')?.disable();
    this.assignmentHoseForm.get('statusId8')?.disable();
  }
 
  createAssignment(){
    
    this.dispenserService.createAssignment(this.assignmentHoseForm.value)
        .subscribe(data => {
          Swal.fire('Exitoso', 'creado correctamente');
          //this.enableForm();
          //this.assignmentHoseForm.get('dispenserId')?.disable();
          //this.assignmentHoseForm.reset();
          //this.router.navigateByUrl('/dashboard/infrastructure/dispensers/listDispensers');
        }, err => {
          Swal.fire('Error', err.error.msg, 'error')

        })
  }

  createAssignmentHose(){
   this.dispenserService.creatAssignmentHose(this.assignmentHoseForm.value)
        .subscribe(data => {
          Swal.fire('Exitoso', 'creado correctamente');
          //this.assignmentHoseForm.get('dispenserId')?.disable();
          //this.assignmentHoseForm.reset();
          //this.router.navigateByUrl('/dashboard/infrastructure/dispensers/listDispensers');
        }, err => {
          Swal.fire('Error', err.error.msg, 'error')
        })

        console.log(this.assignmentHoseForm.value)
  }

  save(){
    this.disableForm();
    
  }

  getIdAssignment(){

   // console.log(this.assignmentHoseForm.value)
    this.dispenserService.getIdAssig(this.assignmentHoseForm.value)
      .subscribe(data => {
        console.log(data.idAssignments)
        this.assignmentHoseForm.controls['assignmentId'].setValue(data.idAssignments)
        console.log(this.assignmentHoseForm.value)
        Swal.fire('Exitoso', 'creado correctamente');

        //this.assignmentHoseForm.controls['assignmentId'].setValue(t)
        //this.assignmentHoseForm.reset();
        //this.router.navigateByUrl('/dashboard/infrastructure/dispensers/listDispensers');
        
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
        console.log(err)
      })
  }


  sideA(){
    this.dispenserService.getSideA()
      .subscribe(data =>{
        this.selectedSideA = data
        console.log(data)
      })
  }

  sideB(){
    this.dispenserService.getSideA()
      .subscribe(data =>{
        this.selectedSideB = data
        console.log(data)
      })
  }


  position1(){
    this.assignmentHoseForm.get('hosesId')?.enable();
    this.assignmentHoseForm.get('statusId')?.enable();
    this.sideA();
    
    this.getIdAssignment();
    
    this.dispenserService.creatAssignmentHose(this.assignmentHoseForm.value)
          .subscribe( data =>  {
                    
        Swal.fire('Exitoso', 'creado correctamente');

        //this.assignmentHoseForm.controls['assignmentId'].setValue(t)
        //this.assignmentHoseForm.reset();
        //this.router.navigateByUrl('/dashboard/infrastructure/dispensers/listDispensers');
        
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
        console.log(err)
          })
  }

  prueba(){}

}
