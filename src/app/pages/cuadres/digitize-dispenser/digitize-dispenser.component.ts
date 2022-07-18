import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialog } from 'src/app/interfaces/fuelstation/confirmation-dialog.interface';
import { AssignmentHose } from 'src/app/models/fuelstation/assignment.model';
import { DispenserReader, Dispensers } from 'src/app/models/fuelstation/dispensers.model';
import { Island } from 'src/app/models/fuelstation/island.models';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';
import { ConfirmationsService } from 'src/app/services/functions/confirmations.service';
import Swal from 'sweetalert2';
import { ConfirmationsComponent } from '../../dialogs/confirmations/confirmations.component';

@Component({
  selector: 'app-digitize-dispenser',
  templateUrl: './digitize-dispenser.component.html',
  styleUrls: ['./digitize-dispenser.component.css']
})
export class DigitizeDispenserComponent implements OnInit {

  color = 'accent';

  showMe : boolean = false;

  buttonDisableRegular: boolean = true;
  buttonDisableSuper : boolean = true;
  buttonDisableDiesel : boolean = true;
  buttonDisableVpower : boolean = true;
  buttonDisableRegularB: boolean = true;
  buttonDisableSuperB : boolean = true;
  buttonDisableDieselB : boolean = true;
  buttonDisableVpowerB : boolean = true;
  public columnsRegular: string[] = [];
  public selectedIsland: Island[] = [];
  public selectedDispenser: Dispensers[] = [];
  public selectedAssignmentHose: AssignmentHose[] = [];
  public dispenserReaderG: DispenserReader[] = [];
  public dispenserReaderM: DispenserReader[] = [];
  public dispenserReaderMY: DispenserReader[] = [];

  

  digitizeForm: FormGroup = this.fb.group({
    assignmentId: ['', Validators.required],
    assignmentHoseId: ['', Validators.required],
    dispenserId: ['', Validators.required],
    sideId: ['', Validators.required],
    position: ['', Validators.required],
    islaNombre: ['', Validators.required],
    readingDate: ['', Validators.required],
    totalFuelA: [0, Validators.required],
    totalFuelB: [0, Validators.required],
    totalFuelC: [0, Validators.required],
    totalFuelD: [0, Validators.required],
    previuosNoGallons: [0],
    actualNoGallons: [0],
    totalNoGallons: [0],
    previuosNoMechanic: [0],
    actualNoMechanic: [0],
    totalNoMechanic: [0],
    previuosNoMoney: [0],
    actualNoMoney: [0],
    totalNoMoney: [0],
    generalDispenserReaderId: ['', Validators.required]

  })

  constructor(
    private fb: FormBuilder,
    private islandService: IslandsService,
    private dispenserService: DispensersService,
    private confirmationService: ConfirmationsService,
    private dialog: MatDialog


  ) { }

  ngOnInit(): void {
    this.getDispenser();
    this.sideA();

  }

  createDispenserReader() {
    this.dispenserService.createDispenserReader(this.digitizeForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Actualizado Correctamente`, 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }

  creatGeneralAssignmentDispenserReader() {
    this.dispenserService.createGeneralDispenserReader(this.digitizeForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Actualizado Correctamente`, 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }



  sideA() {
    this.dispenserService.getSideA()
      .subscribe(({ sideDispenser }) => {
        this.digitizeForm.controls['sideId'].setValue(sideDispenser.sideId);

      })
  }

  sideB() {
    this.dispenserService.getSideB()
      .subscribe(({ sideDispenser }) => {

        this.digitizeForm.controls['sideId'].setValue(sideDispenser.sideId);


      })
  }


  getIsland() {
    this.islandService.getIslandsActive()
      .subscribe(({ island }) => {
        this.selectedIsland = island
      });
  };

  getDispenser() {
    this.dispenserService.getDIspensers()
      .subscribe(({ dispenser }) => {
        this.selectedDispenser = dispenser
      });

  }

  getIdAssignment() {
    this.dispenserService.getIdAssig(this.digitizeForm.value)
      .subscribe(({ idAssignments }) => {
        this.digitizeForm.controls['assignmentId'].setValue(idAssignments.assignmentId);
       
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }

  getGeneralAssignmentDispenserReaderId() {
    this.dispenserService.getGeneralDispenserReaderId(this.digitizeForm.value)
      .subscribe(({ generalDispenserReader }) => {
        this.digitizeForm.controls['generalDispenserReaderId'].setValue(generalDispenserReader.generalDispenserReaderId);

      })
  }

  getAssignmentHoseId() {
    this.sideA();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(1);


    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }


  aperturar() {
    this.getIdAssignment();

   
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.creatGeneralAssignmentDispenserReader();
      }
    })


  }

  



  getPreviuosNoGallons() {
    this.dispenserService.getPreviousGallons()
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons

      })
  }

  getPreviuosNoMechanic() {
    this.dispenserService.getPreviousMechanic()
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic

      })
  }

  getPreviuosNoMoney() {
    this.dispenserService.getPreviousMoney()
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney

      })
  }

  regular() {
    //this.getPreviuosNoGallons();
    //this.getPreviuosNoMechanic();
    //this.getPreviuosNoMoney();
    //this.getAssignmentHoseId();
    this.buttonDisableRegular = false
    this.showMe = !this.showMe
    
  

  }

  guardarRegular(): void {

    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
      }
    })
  }

  guardarSuper(): void {

  }

  guardarDiesel(): void {

  }

  guardarRegularB(): void {

  }
  guardarSuperB(): void {

  }

  guardarDieselB(): void {

  }

enableform(){


}

}
