import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'

import { AssignmentHose } from 'src/app/models/fuelstation/assignment.model';
import { DispenserReader, Dispensers } from 'src/app/models/fuelstation/dispensers.model';
import { Island } from 'src/app/models/fuelstation/island.models';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';
import Swal from 'sweetalert2';
import { ConfirmationsComponent } from '../../dialogs/confirmations/confirmations.component';

@Component({
  selector: 'app-digitize-dispenser',
  templateUrl: './digitize-dispenser.component.html',
  styleUrls: ['./digitize-dispenser.component.css']
})
export class DigitizeDispenserComponent implements OnInit {

  operandoA! : Number | any
  operandoB! : Number | any
  resultado! : Number | any
  color = 'accent';

  public columns: string[] = ['fuelId', 'sideId', 'actualNoGallons', 'actualNoMechanic', 'actualNoMoney', 'actions']

  //ocular/mostrar table de super, regular, diesel y vpower
  buttonDisableSideA: boolean = false
  buttonDisableSideAClosed: boolean = false
  buttonDisableSideA1: boolean = false
  buttonDisableSideB1: boolean = false
  buttonDisableSideB1C: boolean = false
  buttonDisableSideA1C: boolean = false

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
  public dispenserReader: DispenserReader[] = [];



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
    private dialog: MatDialog


  ) { }

  ngOnInit(): void {
    this.getDispenser();
    this.listNumerationDispenser();



  }


  //crear el total de numercion englobado de todas las mangueras
  creatGeneralAssignmentDispenserReader() {
    this.dispenserService.createGeneralDispenserReader(this.digitizeForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Apertura de día...`, 'success');
        this.buttonDisableSideA = true;
        this.buttonDisableSideA1 = false;
        this.buttonaperturar = false;
        this.buttonacierre = true;


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
        this.digitizeForm.reset();

      })
  }
  // creacion para agregar numeracion a cada manguera de bomba
  createDispenserReader() {

    this.dispenserService.createDispenserReader(this.digitizeForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Numeracíon registrada Correctamente`, 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }

  // seleccion de lado A de la bomba
  sideA() {
    this.dispenserService.getSideA()
      .subscribe(({ sideDispenser }) => {
        this.digitizeForm.controls['sideId'].setValue(sideDispenser.sideId);

      })
  }

  // seleccion de lado B de la bomba
  sideB() {
    this.dispenserService.getSideB()
      .subscribe(({ sideDispenser }) => {

        this.digitizeForm.controls['sideId'].setValue(sideDispenser.sideId);


      })
  }

  //obtner isla
  getIsland() {
    this.islandService.getIslandsActive()
      .subscribe(({ island }) => {
        this.selectedIsland = island
      });
  };

  //obtner el dispensador(bomba)
  getDispenser() {
    this.dispenserService.getDIspensers()
      .subscribe(({ dispenser }) => {
        this.selectedDispenser = dispenser
      });

  }

  //obntener el id de la asignacio de la bomba
  getIdAssignment() {
    this.dispenserService.getIdAssig(this.digitizeForm.value)
      .subscribe(({ idAssignments }) => {
        this.digitizeForm.controls['assignmentId'].setValue(idAssignments.assignmentId);

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }

  //obtener el id del registro general de bomba diario
  getGeneralAssignmentDispenserReaderId() {
    this.dispenserService.getGeneralDispenserReaderId(this.digitizeForm.value)
      .subscribe(({ generalDispenserReader }) => {
        this.digitizeForm.controls['generalDispenserReaderId'].setValue(generalDispenserReader.generalDispenserReaderId);

      })
  }

  //manguera del lado A de la bomba 1 isla 1
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

  //manguera del lado B de la bomba 1 isla 1
  getAssignmentHoseIdRegularB1() {
    this.sideB();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(1);


    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }

  //manguera del lado BAde la bomba 1 isla 1
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

  //manguera del lado BAde la bomba 1 isla 1
  getAssignmentHoseIdSuperB1() {
    this.sideB();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(2);
    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      })
  }

  //manguera del lado A de la bomba 1 isla 1
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

  //manguera del lado B de la bomba 1 isla 1
  getAssignmentHoseIdDieselB1() {
    this.sideB();
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

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.buttonDisableSideA = false
        this.buttonDisableSideAClosed = true
        this.btnDisableRegularR1A = false
        this.btnDisableSuperR1A = false
        this.btnDisableDisableR1A = false
        this.buttonDisableSideA1 = false

      }

    })

  }

  habilitarB() {
    this.sideB();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.buttonDisableSideA = false
        this.buttonDisableSideAClosed = true
        this.btnDisableRegularR1B = false
        this.btnDisableSuperR1B = false
        this.btnDisableDieselR1B = false
        this.buttonDisableSideA1 = false
        this.buttonDisableSideB1 = true
      }
    })

  }

  //cierra el lado A isla 1
  closedSideA() {

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.listNumerationDispenser();
        this.buttonDisableSideA = false
        this.btnDisableRegularR1A = true
        this.btnDisableSuperR1A = true
        this.btnDisableDisableR1A = true
        this.buttonDisableSideAClosed = false
        this.buttonDisableSideA1 = true
        this.buttonDisableSideA1C = true
        this.buttonDisableSideAClosed = true

      };
    });




  }

  closedSideB() {

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.listNumerationDispenser();
        this.buttonDisableSideA1 = false;
        this.buttonDisableSideB1 = false;
        this.buttonDisableSideB1C = true;
        this.btnDisableRegularR1B = true
        this.btnDisableSuperR1B = true
        this.btnDisableDieselR1B = true

      };
    });

  }

  getPreviuosNoGallons() {
    this.dispenserService.getPreviousGallons(this.digitizeForm.value)
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons
        console.log(previousNoGallons)

      })
  }

  getPreviuosNoMechanic() {
    this.dispenserService.getPreviousMechanic(this.digitizeForm.value)
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic
        console.log(previousNoMechanic)

      })
  }

  getPreviuosNoMoney() {
    this.dispenserService.getPreviousMoney(this.digitizeForm.value)
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney
        console.log(previousNoMoney)
      });
  };


  getPreviuosNoGallonsSuper() {
    this.dispenserService.getPreviousGallonsSuper(this.digitizeForm.value)
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons
        console.log(previousNoGallons)
      });
  };

  getPreviuosNoMechanicSuper() {
    this.dispenserService.getPreviousMechanicSuper(this.digitizeForm.value)
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic
        console.log(previousNoMechanic)
      });
  };

  getPreviuosNoMoneySuper() {
    this.dispenserService.getPreviousMoneySuper(this.digitizeForm.value)
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney
        console.log(previousNoMoney)
      });
  };


  getPreviuosNoGallonsDiesel() {
    this.dispenserService.getPreviousGallonsDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons
        console.log(previousNoGallons)
      });
  };

  getPreviuosNoMechanicDiesel() {
    this.dispenserService.getPreviousMechanicDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic
        console.log(previousNoMechanic)
      });
  };

  getPreviuosNoMoneyDiesel() {
    this.dispenserService.getPreviousMoneyDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney
        console.log(previousNoMoney)
      });
  };


  getPreviuosNoGallonsVpower() {
    this.dispenserService.getPreviousGallonsVpower(this.digitizeForm.value)
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons
      });
  };

  getPreviuosNoMechanicVpower() {
    this.dispenserService.getPreviousMechanicVpower(this.digitizeForm.value)
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic
      });
  };

  getPreviuosNoMoneyVpower() {
    this.dispenserService.getPreviousMoneyVpower(this.digitizeForm.value)
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney

      });
  };


  //aperturar manguera Regular lado A Isla 1
  regular1A() {
    this.getAssignmentHoseIdRegularA1();
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getPreviuosNoGallons();
        this.getPreviuosNoMechanic();
        this.getPreviuosNoMoney();
        this.getAssignmentHoseIdRegularA1();
        this.showMeRegular1A = this.showMeRegular1A
        this.btnDisableRegularR1A = true
        this.btnDisableSuperR1A = true
        this.btnDisableDisableR1A = true
        this.btnDisableRegularR1B = true
        this.btnDisableSuperR1B = true
        this.btnDisableDieselR1B = true
        this.buttonDisableRegular = false
        this.showMeRegular1A = !this.showMeRegular1A
        this.btnDisableSuperR1A = true
        this.btnDisableDisableR1A = true
        this.btnDisableRegularR1B = true
        this.btnDisableSuperR1B = true
        this.btnDisableDieselR1B = true

      };
    });
  };


  //aperturar manguera Regular lado B Isla 1
  regular1B() {
    this.getAssignmentHoseIdRegularB1();
    this, this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if(resp){

      this.getPreviuosNoGallons();
      this.getPreviuosNoMechanic();
      this.getPreviuosNoMoney();
      this.getAssignmentHoseIdRegularB1();
      this.buttonDisableRegular = false
      this.buttonDisableRegularB = false
      this.showMeRegular1B = !this.showMeRegular1B
      this.btnDisableRegularR1A = true
      this.btnDisableSuperR1A = true
      this.btnDisableDisableR1A = true
      this.btnDisableSuperR1B = true
      this.btnDisableDieselR1B = true
      this.btnDisableSuperR1A = true
      this.btnDisableDisableR1A = true
      this.btnDisableRegularR1B = true
      this.btnDisableSuperR1B = true
      this.btnDisableDieselR1B = true
      }
    });
  };

  //aperturar manguera Super lado A Isla 1
  super1A() {
    this.getAssignmentHoseIdSuperA1();
    this.getGeneralAssignmentDispenserReaderId();

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getPreviuosNoGallonsSuper();
        this.getPreviuosNoMechanicSuper();
        this.getPreviuosNoMoneySuper();
        this.getAssignmentHoseIdSuperA1();
        this.buttonDisableSuper = false
        this.btnDisableRegularR1A = true
        this.btnDisableDisableR1A = true
        this.btnDisableRegularR1B = true
        this.btnDisableSuperR1B = true
        this.btnDisableDieselR1B = true
        this.buttonDisableRegular = false
        this.showMeSuper1A = !this.showMeSuper1A
        this.buttonDisableSuper = false
        this.btnDisableRegularR1A = true
        this.btnDisableDisableR1A = true
        this.btnDisableRegularR1B = true
        this.btnDisableSuperR1B = true
        this.btnDisableDieselR1B = true
        this.buttonDisableRegular = false

      };
    });
  };

  //aperturar manguera Regular lado B Isla 1
  super1B() {
    this.getAssignmentHoseIdSuperB1();
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getPreviuosNoGallonsSuper();
        this.getPreviuosNoMechanicSuper();
        this.getPreviuosNoMoneySuper();
        this.getAssignmentHoseIdSuperB1();
        this.buttonDisableSuper = false
        this.btnDisableRegularR1A = true
        this.btnDisableDisableR1A = true
        this.btnDisableRegularR1B = true
        this.btnDisableSuperR1B = true
        this.btnDisableDieselR1B = true
        this.buttonDisableRegular = false
        this.showMeSuper1B = !this.showMeSuper1B
        this.buttonDisableSuperB = false
        this.btnDisableRegularR1A = true
        this.btnDisableDisableR1A = true
        this.btnDisableRegularR1B = true
        this.btnDisableSuperR1B = true
        this.btnDisableDieselR1B = true
        this.buttonDisableRegular = false

      };
    });
  };

  diesel1A() {
    this.getAssignmentHoseIdDieselA1();
    this.getGeneralAssignmentDispenserReaderId();

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getPreviuosNoGallonsDiesel();
        this.getPreviuosNoMechanicDiesel();
        this.getPreviuosNoMoneyDiesel();
        this.getAssignmentHoseIdDieselA1();
        this.buttonDisableDiesel = false
        this.buttonDisableSuper = true
        this.btnDisableDisableR1A = true
        this.btnDisableRegularR1A = true
        this.btnDisableSuperR1B = true
        this.btnDisableDieselR1B = true
        this.buttonDisableRegular = true
        this.showMeDiesel1A = !this.showMeDiesel1A
        this.btnDisableSuperR1A = true
        this.btnDisableRegularR1B = true
        this.btnDisableSuperR1B = true
        this.btnDisableDieselR1B = true
        console.log(this.digitizeForm.value)
      };
    });
  };

  diesel1B() {
    this.getAssignmentHoseIdDieselB1();
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getPreviuosNoGallonsDiesel();
        this.getPreviuosNoMechanicDiesel();
        this.getPreviuosNoMoneyDiesel();
        this.getAssignmentHoseIdDieselB1();
        this.buttonDisableDieselB = false
        this.buttonDisableSuper = true
        this.btnDisableDisableR1A = true
        this.btnDisableRegularR1A = true
        this.btnDisableSuperR1B = true
        this.btnDisableDieselR1B = true
        this.buttonDisableRegular = false
        this.showMeDiesel1B = !this.showMeDiesel1B
        this.btnDisableSuperR1A = true
        this.btnDisableRegularR1B = true
        this.btnDisableSuperR1B = true
        this.btnDisableDieselR1B = true

      };
    });



  }

  vpower1A() {
    this.buttonDisableVpower = false
    this.showMeVPower1A = !this.showMeVPower1A
  }




  vpower1B() {

  }

  //guarda el detalle de numeracion de bomba de regular lado A isla 1
  guardarRegularA1(): void {

    this.operandoA = this.digitizeForm.get('previuosNoGallons')?.value
    this.operandoB = this.digitizeForm.get('actualNoGallons')?.value

    this.resultado = this.operandoB - this.operandoA
   
    console.log(this.resultado)
    this.digitizeForm.controls['totalNoGallons'].setValue(this.resultado);
    console.log(this.digitizeForm.value)
    //this.resultado = this.operandoB - this.operandoA
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {

        
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv();
        this.showdigitButton();

        this.resetFormValuesNumbering();
        console.log(this.digitizeForm.value)
       


       

      };

    });
  };

  //guarda el detalle de numeracion de bomba de regular lado B isla 1
  guardarRegularB1(): void {
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv();
        this.showdigitButton();

        this.resetFormValuesNumbering();
        // console.log(this.digitizeForm.value)

      };

    });
  };



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
        this.resetFormValuesNumbering();
      };
    });
  }

  //guarda el detalle de numeracion de bomba de super lado B Isla 1
  guardarSuperB1(): void {
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv();
        this.showdigitButton();
        this.resetFormValuesNumbering();
      };
    });
  };


  //guarda el detalle de numeracion de bomba de diesel lado A Isla 1
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
        this.resetFormValuesNumbering();

      };
    });
  };

  //guarda el detalle de numeracion de bomba de diesel lado B Isla 1
  guardarDieselB1(): void {
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv();
        this.showdigitButton();
        this.resetFormValuesNumbering();

      };
    });

  };


  cancelarRegularA1() {
    this.HideMeDiv();
    this.showdigitButton();

  };

  cancelarSuperA1() {
    this.HideMeDiv();
    this.showdigitButton();
  };

  cancelarDieselA1() {
    this.HideMeDiv();
    this.showdigitButton();

  };

  cancelarRegularB1() {
    this.HideMeDiv();
    this.showdigitButton();

  };

  cancelarSuperB1() {
    this.HideMeDiv();
    this.showdigitButton();
  };

  cancelarDieselB1() {
    this.HideMeDiv();
    this.showdigitButton();
  };

  HideMeDiv() {

    this.showMeRegular1A = false;
    this.showMeSuper1A = false;
    this.showMeDiesel1A = false;
    this.showMeVPower1A = false;
    this.showMeRegular1B = false;
    this.showMeSuper1B = false;
    this.showMeDiesel1B = false;
    this.showMeVPower1B = false;
  };

  showdigitButton() {
    this.btnDisableRegularR1A = false
    this.btnDisableSuperR1A = false
    this.btnDisableDisableR1A = false
    this.btnDisableRegularR1B = false
    this.btnDisableSuperR1B = false
    this.btnDisableDieselR1B = false
  };

  //resetea los valores de numeracion a 0 del fomulario para que pueda ser reutilizable otros metodos
  resetFormValuesNumbering(): void {
    this.digitizeForm.controls['previuosNoGallons'].setValue(0);
    this.digitizeForm.controls['actualNoGallons'].setValue(0);
    this.digitizeForm.controls['previuosNoMechanic'].setValue(0);
    this.digitizeForm.controls['actualNoMechanic'].setValue(0);
    this.digitizeForm.controls['previuosNoMoney'].setValue(0);
    this.digitizeForm.controls['actualNoMoney'].setValue(0);

  };

  //mostar en tabla los registros actuales del dia almacenado
  listNumerationDispenser() {
    this.dispenserService.getActualListNumeration(this.digitizeForm.value)
      .subscribe(({ listNumerationDispenser }) => {
        this.dispenserReader = listNumerationDispenser

      })



    /*const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {

        this.dispenserService.getActualListNumeration(this.digitizeForm.value)
          .subscribe( listNumerationDispenser => {
            this.dispenserReaderG = listNumerationDispenser

            console.log(listNumerationDispenser)
          })

      };
    });*/

  }
}


