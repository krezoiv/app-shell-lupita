import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hoses, SideDispenser } from 'src/app/models/fuelstation/hoses.models';
import { Status } from 'src/app/models/status.model';
import { HosesService } from 'src/app/services/fuelstation/hoses.service';
import { StatusService } from 'src/app/services/functions/status.service';
import { Dispensers } from 'src/app/models/fuelstation/dispensers.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import Swal from 'sweetalert2';
import { Assignment, AssignmentHose } from 'src/app/models/fuelstation/assignment.model';



@Component({
  selector: 'app-assignments-hoses',
  templateUrl: './assignments-hoses.component.html',
  styleUrls: ['./assignments-hoses.component.css']
})
export class AssignmentsHosesComponent implements OnInit {

  color = 'accent'
  buttonDisable: boolean = true;
  buttonDisable2: boolean = true;
  buttonDisable3: boolean = true;
  buttonDisable4: boolean = true;
  buttonDisable5: boolean = true;
  buttonDisable6: boolean = true;
  buttonDisable7: boolean = true;
  buttonDisable8: boolean = true;

  selectedStatus: Status[] = [];
  selectedHose: Hoses[] = [];
  public SelectedsideA: SideDispenser[] = [];
  selectedSideB: SideDispenser[] = [];
  selectedDispenser: Dispensers[] = [];
  public assignements: Assignment[] = [];
  public assignmentsHose : AssignmentHose [] = [];
  public columns : string[]= ['hoseId', 'sideId', 'position', 'statusId'];


  assignmentHoseForm: FormGroup = this.fb.group({
    hoseId: [''],
    position: [''],
    statusId: [''],
    assignmentId: ['', Validators.required],
    dispenserId: ['', Validators.required],
    sideId: ['', Validators.required]

  })

  constructor(

    private fb: FormBuilder,
    private hoseService: HosesService,
    private statusService: StatusService,
    private dispenserService: DispensersService,



  ) { }

  ngOnInit(): void {
    this.disableForm();
    this.getHose();
    this.getStatus();
    this.getDispenser();
    this.getAssignmentHoses();
    


  }

  getDispenser() {
    this.dispenserService.getDIspensers()
      .subscribe(({ dispenser }) => {
        this.selectedDispenser = dispenser
      })
  }

  getStatus() {
    this.statusService.getStatus()
      .subscribe(({ status }) => {
        this.selectedStatus = status

      });
  };

  getHose() {
    this.hoseService.getHosesActive()
      .subscribe(({ hoses }) => {
        this.selectedHose = hoses

      })
  }

  enableForm() {
    this.assignmentHoseForm.get('hoseId')?.enable();
    this.assignmentHoseForm.get('statusId')?.enable();



  }

  disableForm() {
    this.assignmentHoseForm.get('hoseId')?.disable();
    this.assignmentHoseForm.get('statusId')?.disable();

  }

  createAssignment() {

    this.dispenserService.createAssignment(this.assignmentHoseForm.value)
      .subscribe(data => {
      
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }

  createAssignmentHose() {
    this.dispenserService.creatAssignmentHose(this.assignmentHoseForm.value)
      .subscribe(data => {
        Swal.fire('Exitoso', 'creado correctamente');

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })


  }

  save() {
    this.disableForm();

  }

  getIdAssignment() {


    this.dispenserService.getIdAssig(this.assignmentHoseForm.value)
      .subscribe(({ idAssignments }) => {
        this.assignmentHoseForm.controls['assignmentId'].setValue(idAssignments.assignmentId);
        Swal.fire('Exitoso', 'creado correctamente');
        
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }


  sideA() {
    this.dispenserService.getSideA()
      .subscribe(({ sideDispenser }) => {
        this.assignmentHoseForm.controls['sideId'].setValue(sideDispenser.sideId);

      })
  }

  sideB() {
    this.dispenserService.getSideB()
      .subscribe(({ sideDispenser }) => {

        this.assignmentHoseForm.controls['sideId'].setValue(sideDispenser.sideId);


      })
  }


  position1() {
    this.assignmentHoseForm.get('hoseId')?.enable();
    this.assignmentHoseForm.get('statusId')?.enable();
    this.sideA();
    this.buttonDisable = false


  }

  savePosition1() {
    this.getIdAssignment();
    this.assignmentHoseForm.controls['position'].setValue('1');
    this.dispenserService.creatAssignmentHose(this.assignmentHoseForm.value)
      .subscribe(data => {
        Swal.fire('Exitoso', 'creado correctamente');
        this.disableForm();
      
        this.buttonDisable = true
        this.getAssignmentHoses();


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })

  }

  position2() {
    this.assignmentHoseForm.get('hoseId')?.enable();
    this.assignmentHoseForm.get('statusId')?.enable();
    this.sideA();
    this.buttonDisable2 = false


  }

  savePosition2() {
    this.getIdAssignment();
    this.assignmentHoseForm.controls['position'].setValue('2');
    this.dispenserService.creatAssignmentHose(this.assignmentHoseForm.value)
      .subscribe(data => {
        Swal.fire('Exitoso', 'creado correctamente');
        this.disableForm();
        this.buttonDisable2 = true
        this.getAssignmentHoses();

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })

  }

  position3() {
    this.assignmentHoseForm.get('hoseId')?.enable();
    this.assignmentHoseForm.get('statusId')?.enable();
    this.sideA();
    this.buttonDisable3 = false


  }

  savePosition3() {
    this.getIdAssignment();
    this.assignmentHoseForm.controls['position'].setValue('3');
    this.dispenserService.creatAssignmentHose(this.assignmentHoseForm.value)
      .subscribe(data => {
        Swal.fire('Exitoso', 'creado correctamente');
        this.disableForm();
        this.buttonDisable3 = true
        this.getAssignmentHoses();

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })

  }

  position4() {
    this.assignmentHoseForm.get('hoseId')?.enable();
    this.assignmentHoseForm.get('statusId')?.enable();
    this.sideA();
    this.buttonDisable4 = false


  }

  savePosition4() {
    this.getIdAssignment();
    this.assignmentHoseForm.controls['position'].setValue('4');
    this.dispenserService.creatAssignmentHose(this.assignmentHoseForm.value)
      .subscribe(data => {
        Swal.fire('Exitoso', 'creado correctamente');
        this.disableForm();
        this.buttonDisable4 = true
        this.getAssignmentHoses();

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })

  }


  position5() {
    this.assignmentHoseForm.get('hoseId')?.enable();
    this.assignmentHoseForm.get('statusId')?.enable();
    this.sideB();
    this.buttonDisable5 = false


  }

  savePosition5() {
    this.getIdAssignment();
    this.assignmentHoseForm.controls['position'].setValue('5');

    this.dispenserService.creatAssignmentHose(this.assignmentHoseForm.value)
      .subscribe(data => {
        Swal.fire('Exitoso', 'creado correctamente');
        this.disableForm();
        this.buttonDisable5 = true
        this.getAssignmentHoses();

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })

  }

  position6() {
    this.assignmentHoseForm.get('hoseId')?.enable();
    this.assignmentHoseForm.get('statusId')?.enable();
    this.sideB();
    this.buttonDisable6 = false


  }

  savePosition6() {
    this.getIdAssignment();
    this.assignmentHoseForm.controls['position'].setValue('6');
    this.dispenserService.creatAssignmentHose(this.assignmentHoseForm.value)
      .subscribe(data => {
        Swal.fire('Exitoso', 'creado correctamente');
        this.disableForm();
        this.buttonDisable6 = true
        this.getAssignmentHoses();

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })

  }

  position7() {
    this.assignmentHoseForm.get('hoseId')?.enable();
    this.assignmentHoseForm.get('statusId')?.enable();
    this.sideB();
    this.buttonDisable7 = false
    


  }

  savePosition7() {
    this.getIdAssignment();
    this.assignmentHoseForm.controls['position'].setValue('7');
    this.dispenserService.creatAssignmentHose(this.assignmentHoseForm.value)
      .subscribe(data => {
        Swal.fire('Exitoso', 'creado correctamente');
        this.disableForm();
        this.buttonDisable7 = true
        this.getAssignmentHoses();

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })

  }


  position8() {
    this.assignmentHoseForm.get('hoseId')?.enable();
    this.assignmentHoseForm.get('statusId')?.enable();
    this.sideB();
    this.buttonDisable8 = false


  }

  savePosition8() {
    this.getIdAssignment();
    this.assignmentHoseForm.controls['position'].setValue('8');
    this.dispenserService.creatAssignmentHose(this.assignmentHoseForm.value)
      .subscribe(data => {
        Swal.fire('Exitoso', 'creado correctamente');
        this.disableForm();
        this.buttonDisable8 = true
        this.getAssignmentHoses();

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })

  }


  getAssignmentHoses() {


    this.dispenserService.getAssignmetHoses(this.assignmentHoseForm.value)
      .subscribe(({ assignmentHose }) => {
       this.assignmentsHose = assignmentHose
        Swal.fire('Exitoso', 'creado correctamente');
       

      })
  }


}
