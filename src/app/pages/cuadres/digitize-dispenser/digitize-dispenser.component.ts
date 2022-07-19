import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  //ocular/mostrar table de super, regular, diesel y vpower


  buttonDisableSideA: boolean = false
  buttonDisableSideB: boolean = false

  showMeRegular1A: boolean = false;
  showMeSuper1A: boolean = false;
  showMeDiesel1A: boolean = false;
  showMeVPower1A: boolean = false;
  showMeRegular1B: boolean = false;
  showMeSuper1B: boolean = false;
  showMeDiesel1B: boolean = false;
  showMeVPower1B: boolean = false;


  //mostar/ocultar botono para digitar
  btnDisableRegularR1A: boolean = true
  btnDisableSuperR1A: boolean = true
  btnDisableDisableR1A: boolean = true
  btnDisableRegularR1B: boolean = true
  btnDisableSuperR1B: boolean = true
  btnDisableDieselR1B: boolean = true

  //bboton de apertura de dia
  buttonaperturar: boolean = true
  buttonacierre: boolean = false

  //boton para cacelar
  buttonDisableRegular: boolean = true;
  buttonDisableSuper: boolean = true;
  buttonDisableDiesel: boolean = true;
  buttonDisableVpower: boolean = true;
  buttonDisableRegularB: boolean = true;
  buttonDisableSuperB: boolean = true;
  buttonDisableDieselB: boolean = true;
  buttonDisableVpowerB: boolean = true;
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
    private router: Router,
    private dialog: MatDialog


  ) { }

  ngOnInit(): void {
    this.getDispenser();


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
        this.buttonDisableSideA = true;
        this.buttonaperturar = false;
        this.buttonacierre = true;


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
        this.digitizeForm.reset();

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

  getAssignmentHoseIdRegularA1() {
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

  getAssignmentHoseIdSuperA1() {
    this.sideA();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(2);
    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }

  getAssignmentHoseIdDieselA1() {
    this.sideA();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(3);


    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }



  //apertura de dia
  aperturar() {

    if (this.digitizeForm.get('readingDate')?.value == '') {
      return
    }

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

  cierre() {

  }


  habilitarA() {

    this.sideA();
    this.buttonDisableSideA = false
    this.buttonDisableSideB = true
    this.btnDisableRegularR1A = false
    this.btnDisableSuperR1A = false
    this.btnDisableDisableR1A = false
  }

  /*habilitarB() {

    this.sideB();
    this.buttonDisableSideA = true
    this.buttonDisableSideB = false
  }*/

  getPreviuosNoGallons() {
    this.dispenserService.getPreviousGallons(this.digitizeForm.value)
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons

      })
  }

  getPreviuosNoMechanic() {
    this.dispenserService.getPreviousMechanic(this.digitizeForm.value)
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic

      })
  }

  getPreviuosNoMoney() {
    this.dispenserService.getPreviousMoney(this.digitizeForm.value)
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney

      })
  }


  getPreviuosNoGallonsSuper() {
    this.dispenserService.getPreviousGallonsSuper(this.digitizeForm.value)
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons

      })
  }

  getPreviuosNoMechanicSuper() {
    this.dispenserService.getPreviousMechanicSuper(this.digitizeForm.value)
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic

      })
  }

  getPreviuosNoMoneySuper() {
    this.dispenserService.getPreviousMoneySuper(this.digitizeForm.value)
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney

      })
  }


  getPreviuosNoGallonsDiesel() {
    this.dispenserService.getPreviousGallonsDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons

      })
  }

  getPreviuosNoMechanicDiesel() {
    this.dispenserService.getPreviousMechanicDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic

      })
  }

  getPreviuosNoMoneyDiesel() {
    this.dispenserService.getPreviousMoneyDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney

      })
  }


  getPreviuosNoGallonsVpower() {
    this.dispenserService.getPreviousGallonsVpower(this.digitizeForm.value)
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons

      })
  }

  getPreviuosNoMechanicVpower() {
    this.dispenserService.getPreviousMechanicVpower(this.digitizeForm.value)
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic

      })
  }

  getPreviuosNoMoneyVpower() {
    this.dispenserService.getPreviousMoneyVpower(this.digitizeForm.value)
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney

      })
  }



  regular1A() {
    this.sideA();
    this.getPreviuosNoGallons();
    this.getPreviuosNoMechanic();
    this.getPreviuosNoMoney();
    this.getAssignmentHoseIdRegularA1();

    this.buttonDisableRegular = false
    this.showMeRegular1A = !this.showMeRegular1A


    this.btnDisableSuperR1A = true
    this.btnDisableDisableR1A = true
    this.btnDisableRegularR1B = true
    this.btnDisableSuperR1B = true
    this.btnDisableDieselR1B = true

  }

  super1A() {

    this.sideA();
    this.getPreviuosNoGallonsSuper();
    this.getPreviuosNoMechanicSuper();
    this.getPreviuosNoMoneySuper();
    this.getAssignmentHoseIdSuperA1();
    this.buttonDisableSuper = false
    this.showMeSuper1A = !this.showMeSuper1A
    this.btnDisableRegularR1A = true
    this.btnDisableDisableR1A = true
    this.btnDisableRegularR1B = true
    this.btnDisableSuperR1B = true
    this.btnDisableDieselR1B = true

  }

  diesel1A() {
    this.sideA();
    this.getPreviuosNoGallonsDiesel();
    this.getPreviuosNoMechanicDiesel();
    this.getPreviuosNoMoneyDiesel();
    this.getAssignmentHoseIdDieselA1();
    this.buttonDisableDiesel = false
    this.showMeDiesel1A = !this.showMeDiesel1A
    this.btnDisableRegularR1A = true
    this.btnDisableSuperR1A = true
    this.btnDisableRegularR1B = true
    this.btnDisableSuperR1B = true
    this.btnDisableDieselR1B = true

  }

  vpower1A() {
    this.buttonDisableVpower = false
    this.showMeVPower1A = !this.showMeVPower1A


  }


  regular1B() {
    this.buttonDisableRegularB = false
    this.showMeRegular1B = !this.showMeRegular1B
    this.btnDisableRegularR1A = true
    this.btnDisableSuperR1A = true
    this.btnDisableDisableR1A = true
    this.btnDisableSuperR1B = true
    this.btnDisableDieselR1B = true


  }

  super1B() {
    this.buttonDisableSuperB = false
    this.showMeSuper1B = !this.showMeSuper1B
    this.btnDisableRegularR1A = true
    this.btnDisableSuperR1A = true
    this.btnDisableDisableR1A = true
    this.btnDisableRegularR1B = true
    this.btnDisableDieselR1B = true
  }

  diesel1B() {
    this.buttonDisableDieselB = false
    this.showMeDiesel1B = !this.showMeDiesel1B
    this.btnDisableRegularR1A = true
    this.btnDisableSuperR1A = true
    this.btnDisableDisableR1A = true
    this.btnDisableRegularR1B = true
    this.btnDisableSuperR1B = true


  }

  vpower1B() {

  }

  //guarda el detalle de numeracion de bomba de regular lado A isla 1
  guardarRegularA1(): void {

    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv();
        this.showdigitButton();
        this.digitizeForm.controls['previuosNoGallons'].setValue(0);
        this.digitizeForm.controls['actualNoGallons'].setValue(0);
        this.digitizeForm.controls['previuosNoMechanic'].setValue(0);
        this.digitizeForm.controls['actualNoMechanic'].setValue(0);
        this.digitizeForm.controls['previuosNoMoney'].setValue(0);
        this.digitizeForm.controls['assignmentHoseId'].setValue('');
        
      }
    });

  }

  //guarda el detalle de numeracion de bomba de super lado A Isla 1
  guardarSuperA1(): void {
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv();
        this.showdigitButton();
        this.digitizeForm.controls['previuosNoGallons'].setValue(0);
        this.digitizeForm.controls['actualNoGallons'].setValue(0);
        this.digitizeForm.controls['previuosNoMechanic'].setValue(0);
        this.digitizeForm.controls['actualNoMechanic'].setValue(0);
        this.digitizeForm.controls['previuosNoMoney'].setValue(0);
        this.digitizeForm.controls['actualNoMoney'].setValue(0);

      }
    });


  }

  guardarDieselA1(): void {
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv();
        this.showdigitButton();
        this.digitizeForm.controls['previuosNoGallons'].setValue(0);
        this.digitizeForm.controls['actualNoGallons'].setValue(0);
        this.digitizeForm.controls['previuosNoMechanic'].setValue(0);
        this.digitizeForm.controls['actualNoMechanic'].setValue(0);
        this.digitizeForm.controls['previuosNoMoney'].setValue(0);
        this.digitizeForm.controls['actualNoMoney'].setValue(0);

      }
    });


  }

  guardarRegularB1(): void {

  }
  guardarSuperB1(): void {

  }

  guardarDieselB1(): void {

  }

  cancelarRegularA1() {
    this.HideMeDiv();
    this.showdigitButton();

  }

  cancelarSuperA1() {
    this.HideMeDiv();
    this.showdigitButton();


  }

  cancelarDieselA1() {
    this.HideMeDiv();
    this.showdigitButton();
    
  }

  cancelarRegularB1() {
    this.HideMeDiv();
    this.showdigitButton();

  }

  cancelarSuperB1() {
    this.HideMeDiv();
    this.showdigitButton();

  }

  cancelarDieselB1() {
    this.HideMeDiv();
    this.showdigitButton();

  }

  enableform() {


  }

  HideMeDiv() {

    this.showMeRegular1A = false;
    this.showMeSuper1A = false;
    this.showMeDiesel1A = false;
    this.showMeVPower1A = false;
    this.showMeRegular1B = false;
    this.showMeSuper1B = false;
    this.showMeDiesel1B = false;
    this.showMeVPower1B = false;
  }

  showdigitButton() {
    this.btnDisableRegularR1A = false
    this.btnDisableSuperR1A = false
    this.btnDisableDisableR1A = false
    this.btnDisableRegularR1B = false
    this.btnDisableSuperR1B = false
    this.btnDisableDieselR1B = false
  }
}



/*

  this.btnDisableRegularR1A  = true
  this.btnDisableSuperR1A  = true
  this.btnDisableDisableR1A  = true
  this.btnDisableRegularR1B  = true
  this.btnDisableSuperR1B  = true
  this.btnDisableDieselR1B  = true

*/