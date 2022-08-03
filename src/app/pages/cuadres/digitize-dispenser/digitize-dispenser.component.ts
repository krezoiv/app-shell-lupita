import { DialogRef } from '@angular/cdk/dialog';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AssignmentHose } from 'src/app/models/fuelstation/assignment.model';
import { DispenserReader, Dispensers, GeneralDispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { Island } from 'src/app/models/fuelstation/island.models';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';
import Swal from 'sweetalert2';
import { ConfirmationsComponent } from '../../dialogs/confirmations/confirmations.component';
import { UpdateDispenserReaderDialogComponent } from '../../dialogs/dispensers/update-dispenser-reader-dialog/update-dispenser-reader-dialog.component';

@Component({
  selector: 'app-digitize-dispenser',
  templateUrl: './digitize-dispenser.component.html',
  styleUrls: ['./digitize-dispenser.component.css']
})
export class DigitizeDispenserComponent implements OnInit, OnDestroy {

  suscription!: Subscription;
  suscription2!: Subscription;
  /**
   * variables que permitiran la cantidad total de galones 
   * vendidos por dia 
   */

   a!: Number | any;
   b!: Number | any;
   c!: Number | any;

  calculate_gallonA!: Number | any;
  calculate_gallonP!: Number | any;
  calculate_result_g!: Number | any;
  calculate_mechanicA!: Number | any;
  calculate_mechanicP!: Number | any;
  calculate_result_m!: Number | any;
  calculate_moneyA!: Number | any;
  calculate_moneyP!: Number | any;
  calculate_result_my!: Number | any;
 

  gallonA!: Number | any;
  gallonP!: Number | any;
  result_g!: Number | any;
  mechanicA!: Number | any;
  mechanicP!: Number | any;
  result_m!: Number | any;
  moneyA!: Number | any;
  moneyP!: Number | any;
  result_my!: Number | any;


  RegularGDB!: Number | any;
  RegularGInput!: Number | any;
  RegularMDB!: Number | any;
  RegulaMGInput!: Number | any;
  RegularMYDB!: Number | any;
  RegularMYInput!: Number | any;
  ResultRG!: Number | any;
  ResultRM!: Number | any;
  ResultRMY!: Number | any;

  SuperGDB!: Number | any;
  SuperGInput!: Number | any;
  SuperMDB!: Number | any;
  SuperMGInput!: Number | any;
  SuperMYDB!: Number | any;
  SuperMYInput!: Number | any;
  ResultSG!: Number | any;
  ResultSM!: Number | any;
  ResultSMY!: Number | any;

  DieselGDB!: Number | any;
  DieselGInput!: Number | any;
  DieselMDB!: Number | any;
  DieselMGInput!: Number | any;
  DieselMYDB!: Number | any;
  DieselMYInput!: Number | any;
  ResultDG!: Number | any;
  ResultDM!: Number | any;
  ResultDMY!: Number | any;

  VpowerGDB!: Number | any;
  VpowerGInput!: Number | any;
  VpowerMDB!: Number | any;
  VpowerMGInput!: Number | any;
  VpowerMYDB!: Number | any;
  VpowerMYInput!: Number | any;
  ResultVpG!: Number | any;
  ResultVpM!: Number | any;
  ResultVpMY!: Number | any;

  ResultG!: Number | any;
  ResultM!: Number | any;
  ResultMY!: Number | any;

  /*SuperDB! : Number | any;
  SuperInput! : Number | any;
  DieselDB! : Number | any;
  DieselInput! : Number | any;
  VpowerDB! : Number | any;
  VpowerInput! : Number | any;
  Regular! : Number | any;
  Super! : Number | any;
  Diesel! : Number | any;
  Vpower! : Number | any
  result!: Number | any;
  resultadoG!: Number | any;
  resultadoM!: Number | any;
  resultadoMY!: Number | any;
  */
  color = 'accent';

  public columns: string[] = ['fuelId', 'sideId', 'actualNoGallons', 'actualNoMechanic', 'actualNoMoney', 'actions']

  //ocular/mostrar table de super, regular, diesel y vpower
  buttonDisableSideA: boolean = false;
  buttonDisableSide2A: boolean = false;
  buttonDisableSide2B: boolean = false;
  buttonDisableSideAClosed: boolean = false;
  buttonDisableSide2AClosed: boolean = false;
  buttonDisableSideA1: boolean = false;
  buttonDisableSideB1: boolean = false;
  buttonDisableSideB2: boolean = false;
  buttonDisableSideB1C: boolean = false;
  buttonDisableSideA1C: boolean = false;
  buttonDisableSideA21C: boolean = false;
  buttonDisableSideB21C: boolean = false;

  //show or hide mat-tab islands
  matTabIsla1: boolean = false;
  matTabIsla2: boolean = false;
  buttonDispenser2: boolean = false;//button that will make select dispenser 2 show

  showMeRegular1A: boolean = false;
  showMeRegular2A: boolean = false;
  showMeRegular2B: boolean = false;
  showMeSuper1A: boolean = false;
  showMeSuper2A: boolean = false;
  showMeSuper2B: boolean = false;
  showMeDiesel1A: boolean = false;
  showMeDiesel2A: boolean = false;
  showMeDiesel2B: boolean = false;
  showMeVPower1A: boolean = false;
  showMeVPower2A: boolean = false;
  showMeRegular1B: boolean = false;
  showMeSuper1B: boolean = false;
  showMeDiesel1B: boolean = false;
  showMeVPower1B: boolean = false;
  showMeVPower2B: boolean = false;
  showMeCheck: boolean = false;
  showMeRegularCheck: boolean = true;


  //mostar/ocultar botono para digitar
  btnDisableRegularR1A: boolean = true;
  btnDisableRegularR2B: boolean = true;
  btnDisableRegularR2A: boolean = true;
  btnDisableSuperR1A: boolean = true;
  btnDisableSuperR2A: boolean = true;
  btnDisableSuperR2B: boolean = true;
  btnDisableDisableR1A: boolean = true;
  btnDisableDisableR2A: boolean = true;
  btnDisableRegularR1B: boolean = true;
  btnDisableSuperR1B: boolean = true;
  btnDisableDieselR1B: boolean = true;
  btnDisableDieselR2B: boolean = true;

  //bboton de apertura de dia
  buttonaperturar: boolean = true;
  buttonacierre: boolean = false;

  //boton para cacelar
  buttonDisableRegular: boolean = true;
  buttonDisableRegular2: boolean = true;
  buttonDisableRegularB2: boolean = false;
  buttonDisableSuper: boolean = true;
  buttonDisableSuper2: boolean = true;
  buttonDisableSuperB2: boolean = true;
  buttonDisableDiesel: boolean = true;
  buttonDisableDieselB2: boolean = false;
  buttonDisableDiesel2: boolean = true;
  buttonDisableVpower: boolean = true;
  buttonDisableVpower2: boolean = true;
  buttonDisableRegularB: boolean = true;
  buttonDisableSuperB: boolean = true;
  buttonDisableDieselB: boolean = true;
  buttonDisableVpowerB: boolean = true;
  buttonDisableVpower2B: boolean = true;
  public columnsRegular: string[] = [];
  public selectedIsland: Island[] = [];
  public selectedDispenser: Dispensers[] = [];
  public selectedAssignmentHose: AssignmentHose[] = [];
  public dispenserReaderG: DispenserReader[] = [];
  public dispenserReaderM: DispenserReader[] = [];
  public dispenserReaderMY: DispenserReader[] = [];
  public dispenserReader: DispenserReader[] = [];
  public generalDispenserReader: GeneralDispenserReader[] = [];
  public dispenserReaderPenultimateG: DispenserReader[] = [];



  digitizeForm: FormGroup = this.fb.group({
    assignmentId: ['', Validators.required],
    assignmentHoseId: ['', Validators.required],
    dispenserId: ['', Validators.required],
    sideId: ['', Validators.required],
    position: ['', Validators.required],
    islaNombre: ['', Validators.required],
    readingDate: ['', Validators.required],
    totalGallonRegular: [0, Validators.required],
    totalMechanicRegular: [0, Validators.required],
    totalMoneyRegular: [0, Validators.required],
    totalGallonSuper: [0, Validators.required],
    totalMechanicSuper: [0, Validators.required],
    totalMoneySuper: [0, Validators.required],
    totalGallonDiesel: [0, Validators.required],
    totalMechanicDiesel: [0, Validators.required],
    totalMoneyDiesel: [0, Validators.required],
    totalGallonVpower: [0, Validators.required],
    totalMechanicVpower: [0, Validators.required],
    totalMoneyVpower: [0, Validators.required],
    dispenserReaderId: [''],


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

  });



  constructor(
    private fb: FormBuilder,
    private islandService: IslandsService,
    private dispenserService: DispensersService,
    private dialog: MatDialog,
    private router: Router,


  ) { }

  ngOnInit(): void {


    this.getDispenser();
    this.listNumerationDispenser();
    this.suscription = this.dispenserService.refresh$.subscribe(() => {
      this.listNumerationDispenser();
    })

    this.suscription2 = this.dispenserService.refreshDetail$.subscribe(() => {
      this.listNumerationDispenser();

    })


  };

  ngOnDestroy(): void {
    this.suscription.unsubscribe();

  }

  ngOnDestroyI(): void {
    this.suscription2.unsubscribe();
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

      });
  };

  // creacion para agregar numeracion a cada manguera de bomba
  createDispenserReader() {

    this.dispenserService.createDispenserReader(this.digitizeForm.value)
      .subscribe((data) => {
        Swal.fire('Creado', `Numeracíon registrada Correctamente`, 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };

  // seleccion de lado A de la bomba
  sideA() {
    this.dispenserService.getSideA()
      .subscribe(({ sideDispenser }) => {
        this.digitizeForm.controls['sideId'].setValue(sideDispenser.sideId);

      });
  };

  // seleccion de lado B de la bomba
  sideB() {
    this.dispenserService.getSideB()
      .subscribe(({ sideDispenser }) => {

        this.digitizeForm.controls['sideId'].setValue(sideDispenser.sideId);
      });
  };

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

  };

  //obntener el id de la asignacio de la bomba
  getIdAssignment() {
    this.dispenserService.getIdAssig(this.digitizeForm.value)
      .subscribe(({ idAssignments }) => {
        this.digitizeForm.controls['assignmentId'].setValue(idAssignments.assignmentId);

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };

  //obtener el id del registro general de bomba diario
  getGeneralAssignmentDispenserReaderId() {
    this.dispenserService.getGeneralDispenserReaderId(this.digitizeForm.value)
      .subscribe(({ generalDispenserReader }) => {
        this.digitizeForm.controls['generalDispenserReaderId'].setValue(generalDispenserReader.generalDispenserReaderId);

      });
  };

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

      });
  };


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

      });
  };

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

      });
  };


  //manguera del lado B de la bomba 1 isla 1
  getAssignmentHoseIdRegularB1() {
    this.sideB();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(5);


    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };

  //manguera del lado BAde la bomba 1 isla 1
  getAssignmentHoseIdSuperB1() {
    this.sideB();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(6);
    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };

  //manguera del lado B de la bomba 1 isla 1
  getAssignmentHoseIdDieselB1() {
    this.sideB();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(7);


    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };


  //manguera del lado A de la bomba 2 isla 2
  getAssignmentHoseIdRegularA2() {
    this.sideA();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(9);
    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };



  //manguera del lado BAde la bomba 2 isla 2
  getAssignmentHoseIdSuperA2() {
    this.sideA();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(10);
    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };


  //manguera del lado A de la bomba 2 isla 2
  getAssignmentHoseIdDieselA2() {
    this.sideA();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(11);


    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };


  //manguera del lado B de la bomba 2 isla 2
  getAssignmentHoseIdRegularB2() {
    this.sideB();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(13);


    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };


  //manguera del lado BAde la bomba 2 isla 2
  getAssignmentHoseIdSuperB2() {
    this.sideB();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(14);
    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };


  //manguera del lado B de la bomba 2 isla 2
  getAssignmentHoseIdDieselB2() {
    this.sideB();
    this.getIdAssignment();
    this.digitizeForm.controls['position'].setValue(15);


    this.dispenserService.getAssignmentHoseId(this.digitizeForm.value)
      .subscribe((data) => {
        this.digitizeForm.controls['assignmentHoseId'].setValue(data.assignmenHose.assignmentHoseId);


      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };

  //apertura de dia
  aperturar() {

    if (this.digitizeForm.get('readingDate')?.value == '') {

      return
    };
    // this.getTotalGallons();
    this.getIdAssignment();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.creatGeneralAssignmentDispenserReader();
        this.matTabIsla1 = true;
      };
    });
  };

  closeDay() {
    this.digitizeForm.reset();
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/dashboard/cuadres/digitalizacionBombas'])
      });

    /*  const dialogRef = this.dialog.open(ConfirmationsComponent, {
        width: '400px'
      });
      dialogRef.afterClosed().subscribe(resp => {
        if (resp) {
          this.digitizeForm.reset();
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/dashboard/cuadres/digitalizacionBombas'])
            });
        };
  
      });*/


  }


  habilitarA() {

    this.sideA();
    this.getGeneralAssignmentDispenserReaderId();
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

      };

    });

  };

  //habilita lado A de la isla 2
  habilitar2A() {

    this.sideA();

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.buttonDisableSide2A = false

        this.btnDisableRegularR2A = false
        this.btnDisableSuperR2A = false
        this.btnDisableDisableR2A = false
        this.buttonDisableSideA21C = false;
        this.buttonDisableSide2AClosed = true;


      };

    });

  };


  habilitarB() {
    this.sideB();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.buttonDisableSideA = false;
        this.buttonDisableSideAClosed = false;
        this.btnDisableRegularR1B = false;
        this.btnDisableSuperR1B = false;
        this.btnDisableDieselR1B = false;
        this.buttonDisableSideA1 = false;
        this.buttonDisableSideB1 = true;
      };
    });

  };

  habilitar2B() {
    this.sideB();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.buttonDisableSideB2 = true;
        this.buttonDisableSide2AClosed = false;
        this.btnDisableRegularR2B = false;
        this.btnDisableSuperR2B = false;
        this.btnDisableDieselR2B = false;
        this.buttonDisableSide2A = false;
        this.buttonDisableSide2B = false;
      };
    });
  };

  //cierra el lado A isla 1
  closedSideA() {

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.listNumerationDispenser();
        this.buttonDisableSideA = false;
        this.btnDisableRegularR1A = true;
        this.btnDisableRegularR1B = false
        this.btnDisableSuperR1A = true;
        this.btnDisableSuperR1B = false;
        this.btnDisableDisableR1A = true;
        this.btnDisableDieselR1B = false;
        this.buttonDisableSideAClosed = false;
        this.buttonDisableSideA1 = true;
        this.buttonDisableSideA1C = true;

      };
    });
  };

  //cierra el lado A isla 2
  closedSide2A() {

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.listNumerationDispenser();
        this.buttonDisableSide2A = false;
        this.btnDisableRegularR2A = true;
        this.btnDisableSuperR2A = true;
        this.btnDisableDisableR2A = true;
        this.buttonDisableSide2AClosed = false;
        this.buttonDisableSideA21C = true;
        this.buttonDisableSide2B = true;


      };
    });
  };

  closedSideB() {
    this.digitizeForm.controls['dispenserId'].setValue('');
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.listNumerationDispenser();
        Swal.fire('Informacíon', ` Seleccione Bomba #2 para continuar`);
        this.buttonDisableSideA1 = false;
        this.buttonDisableSideB1 = false;
        this.buttonDisableSideB1C = true;
        this.btnDisableRegularR1B = false;
        this.btnDisableSuperR1B = false;
        this.btnDisableDieselR1B = false;
        this.buttonDisableSide2B = false;
        this.buttonDisableSide2AClosed = false;
        this.buttonDisableSideA21C = false;
        this.buttonDisableSideAClosed = false;
        this.matTabIsla1 = false;
        this.matTabIsla2 = true;
        this.buttonDisableSide2A = false;
        this.buttonDispenser2 = true;


      };
    });

  };

  closedSide2B() {

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.listNumerationDispenser();

        this.buttonDisableSideB2 = false;
        this.buttonDisableSideB21C = true;
        this.btnDisableRegularR2B = false;
        this.btnDisableSuperR2B = false;
        this.btnDisableDieselR2B = false;
        this.buttonDisableSide2B = false;
        this.buttonDisableSide2AClosed = false;
        this.buttonDisableSideA21C = false;
      };
    });

  };

  dispenser2Selected() {
    this.buttonDisableSide2A = true;
    this.getAssignmentHoseIdRegularA2();
    this.getGeneralAssignmentDispenserReaderId();

  }


  
  getPreviuosNoGallons() {
    this.dispenserService.getPreviousGallons(this.digitizeForm.value)
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons
       


      });
  };

  getPreviuosNoGallons1() {
    this.dispenserService.getPreviousGallons1(this.digitizeForm.value)
      .subscribe( (previousNoGallons)  => {
        this.digitizeForm.controls['actualNoGallons'].setValue(previousNoGallons.previousNoGallons.actualNoGallons);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousNoGallons.previousNoGallons.dispenserReaderId);


      });
  };

  getPreviuosNoGallonsMechanicRegular1() {
    this.dispenserService.getPreviousGallonsMechanic1(this.digitizeForm.value)
    .subscribe( (previousNoMechanic)  => {
      this.digitizeForm.controls['actualNoMechanic'].setValue(previousNoMechanic.previousNoMechanic.actualNoMechanic);
    


      });
  };

  getPreviuosNoGallonsMoneyRegular1() {
    this.dispenserService.getPreviousGallonsMoney1(this.digitizeForm.value)
    .subscribe( (previousNoMoney)  => {
      this.digitizeForm.controls['actualNoMoney'].setValue(previousNoMoney.previousNoMoney.actualNoMoney);
    

      });
  };

  getPenultimateNoGallons() {
    this.dispenserService.getPenultimateGallons(this.digitizeForm.value)
      .subscribe(({ penultimateNoGallons }) => {
        this.dispenserReaderPenultimateG = penultimateNoGallons;

      });
  };


  getPreviuosNoMechanic() {
    this.dispenserService.getPreviousMechanic(this.digitizeForm.value)
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic
      });
  };

  

  getPreviuosNoMoney() {
    this.dispenserService.getPreviousMoney(this.digitizeForm.value)
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney
      });
  };


  getPreviuosNoGallonsSuper() {
    this.dispenserService.getPreviousGallonsSuper(this.digitizeForm.value)
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons
      });
  };

  getPreviuosNoMechanicSuper() {
    this.dispenserService.getPreviousMechanicSuper(this.digitizeForm.value)
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic
      });
  };

  getPreviuosNoMoneySuper() {
    this.dispenserService.getPreviousMoneySuper(this.digitizeForm.value)
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney
      });
  };


  getPreviuosNoGallonsDiesel() {
    this.dispenserService.getPreviousGallonsDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoGallons }) => {
        this.dispenserReaderG = previousNoGallons
      });
  };

  getPreviuosNoMechanicDiesel() {
    this.dispenserService.getPreviousMechanicDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoMechanic }) => {
        this.dispenserReaderM = previousNoMechanic
      });
  };

  getPreviuosNoMoneyDiesel() {
    this.dispenserService.getPreviousMoneyDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoMoney }) => {
        this.dispenserReaderMY = previousNoMoney
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


  //total gallons consumed // total de galones consumidos
  getTotalGallons() {
    this.dispenserService.getTotalNoGallons()
      .subscribe(({ noGallons }) => {
        this.digitizeForm.controls['totalGallonRegular'].setValue(noGallons.totalGallonRegular);
        this.digitizeForm.controls['totalMechanicRegular'].setValue(noGallons.totalMechanicRegular);
        this.digitizeForm.controls['totalMoneyRegular'].setValue(noGallons.totalMoneyRegular);
        this.digitizeForm.controls['totalGallonSuper'].setValue(noGallons.totalGallonSuper);
        this.digitizeForm.controls['totalMechanicSuper'].setValue(noGallons.totalMechanicSuper);
        this.digitizeForm.controls['totalMoneySuper'].setValue(noGallons.totalMoneySuper);
        this.digitizeForm.controls['totalGallonDiesel'].setValue(noGallons.totalGallonDiesel);
        this.digitizeForm.controls['totalMechanicDiesel'].setValue(noGallons.totalMechanicDiesel);
        this.digitizeForm.controls['totalMoneyDiesel'].setValue(noGallons.totalMoneyDiesel);
        this.digitizeForm.controls['totalGallonVpower'].setValue(noGallons.totalGallonVpower);
        this.digitizeForm.controls['totalMechanicVpower'].setValue(noGallons.totalMechanicVpower);
        this.digitizeForm.controls['totalMoneyVpower'].setValue(noGallons.totalMoneyVpower);
      })
  }


  //aperturar manguera Regular lado A Isla 1
  regular1A() {
    this.getAssignmentHoseIdRegularA1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
   

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
        this.getPreviuosNoGallons();
        this.getPreviuosNoMechanic();
        this.getPreviuosNoMoney();
        this.getAssignmentHoseIdRegularA1();
        this.btnDisableRegularR1A = true;
        this.btnDisableSuperR1A = true;
        this.btnDisableDisableR1A = true;
        this.btnDisableRegularR1B = true;
        this.btnDisableSuperR1B = true;
        this.btnDisableDieselR1B = true;
        this.buttonDisableRegular = false;
        this.showMeRegular1A = !this.showMeRegular1A;
        this.resetFormValuesNumbering();
      };
    });
  };

  //update numbering gallons on regular
  regular1Aupdate() {
    this.getAssignmentHoseIdRegularA1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
  }

  //aperturar manguera Super lado A Isla 1
  super1A() {
    this.getAssignmentHoseIdSuperA1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
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
        this.resetFormValuesNumbering();
      };
    });
  };

  diesel1A() {
    this.getAssignmentHoseIdDieselA1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
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
        this.resetFormValuesNumbering();
      }
    })

  }

  //aperturar manguera Regular lado B Isla 1
  regular1B() {
    this.getAssignmentHoseIdRegularB1();
    this, this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
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
        this.resetFormValuesNumbering();
      }
    });
  };

  //aperturar manguera Regular lado B Isla 1
  super1B() {
    this.getAssignmentHoseIdSuperB1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
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
        this.resetFormValuesNumbering();
      };
    });
  };

  diesel1B() {
    this.getAssignmentHoseIdDieselB1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
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
        this.resetFormValuesNumbering();
      };
    });

  };

  //aperturar manguera Regular lado A Isla 2
  regular2A() {
    this.getAssignmentHoseIdRegularA2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
        this.getPreviuosNoGallons();
        this.getPreviuosNoMechanic();
        this.getPreviuosNoMoney();
        this.getAssignmentHoseIdRegularA2();
        this.showMeRegular2A = this.showMeRegular1A
        this.btnDisableRegularR2A = true
        this.btnDisableSuperR2A = true
        this.btnDisableDisableR2A = true
        this.btnDisableRegularR2B = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true
        this.buttonDisableRegular2 = false
        this.showMeRegular2A = !this.showMeRegular2A
        this.btnDisableSuperR2A = true
        this.btnDisableDisableR2A = true
        this.btnDisableRegularR2B = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true

        this.resetFormValuesNumbering();

      };
    });
  };

  //aperturar manguera Super lado A Isla 2
  super2A() {
    this.getAssignmentHoseIdSuperA2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
        this.getPreviuosNoGallonsSuper();
        this.getPreviuosNoMechanicSuper();
        this.getPreviuosNoMoneySuper();
        this.getAssignmentHoseIdSuperA2();
        this.buttonDisableSuper2 = false
        this.btnDisableRegularR2A = true
        this.btnDisableDisableR2A = true
        this.btnDisableRegularR2B = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true
        this.buttonDisableRegular2 = false
        this.showMeSuper2A = !this.showMeSuper2A
        this.buttonDisableSuper2 = false
        this.btnDisableRegularR2A = true
        this.btnDisableDisableR2A = true
        this.btnDisableRegularR2B = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true
        this.buttonDisableRegular2 = false

      };
    });
  };

  //aperturar manguera Diesel lado A Isla 2
  diesel2A() {
    this.getAssignmentHoseIdDieselA2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
        this.getPreviuosNoGallonsDiesel();
        this.getPreviuosNoMechanicDiesel();
        this.getPreviuosNoMoneyDiesel();
        this.getAssignmentHoseIdDieselA2();
        this.buttonDisableDiesel2 = false
        this.buttonDisableSuper2 = true
        this.btnDisableDisableR2A = true
        this.btnDisableRegularR2A = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true
        this.buttonDisableRegular2 = true
        this.showMeDiesel2A = !this.showMeDiesel2A
        this.btnDisableSuperR2A = true
        this.btnDisableRegularR2B = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true
        this.resetFormValuesNumbering();
      };
    });
  };

  //aperturar manguera Regular lado B Isla 2
  regular2B() {
    this.getAssignmentHoseIdRegularB2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
        this.getPreviuosNoGallons();
        this.getPreviuosNoMechanic();
        this.getPreviuosNoMoney();
        this.getAssignmentHoseIdRegularB2();
        this.buttonDisableRegular2 = false
        this.buttonDisableRegularB2 = false
        this.showMeRegular2B = !this.showMeRegular2B
        this.btnDisableRegularR2A = true
        this.btnDisableSuperR2A = true
        this.btnDisableDisableR2A = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true
        this.btnDisableSuperR2A = true
        this.btnDisableDisableR2A = true
        this.btnDisableRegularR2B = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true
        this.resetFormValuesNumbering();
      }
    });
  };


  //aperturar manguera Regular lado B Isla 2
  super2B() {
    this.getAssignmentHoseIdSuperB2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
        this.getPreviuosNoGallonsSuper();
        this.getPreviuosNoMechanicSuper();
        this.getPreviuosNoMoneySuper();
        this.getAssignmentHoseIdSuperB2();
        this.buttonDisableSuper2 = false
        this.btnDisableRegularR2A = true
        this.btnDisableDisableR2A = true
        this.btnDisableRegularR2B = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true
        this.buttonDisableRegular2 = false
        this.showMeSuper2B = !this.showMeSuper2B
        this.buttonDisableSuperB2 = false
        this.btnDisableRegularR2A = true
        this.btnDisableDisableR2A = true
        this.btnDisableRegularR2B = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true
        this.buttonDisableRegular2 = false
        this.resetFormValuesNumbering();
      };
    });
  };


  diesel2B() {
    this.getAssignmentHoseIdDieselB2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getTotalGallons();
        this.getPreviuosNoGallonsDiesel();
        this.getPreviuosNoMechanicDiesel();
        this.getPreviuosNoMoneyDiesel();
        this.getAssignmentHoseIdDieselB2();
        this.buttonDisableDieselB2 = false
        this.buttonDisableSuper2 = true
        this.btnDisableDisableR2A = true
        this.btnDisableRegularR2A = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true
        this.buttonDisableRegular2 = false
        this.showMeDiesel2B = !this.showMeDiesel2B
        this.btnDisableSuperR2A = true
        this.btnDisableRegularR2B = true
        this.btnDisableSuperR2B = true
        this.btnDisableDieselR2B = true
        this.resetFormValuesNumbering();

      };
    });

  }


  vpower1A() {
    this.buttonDisableVpower = false
    this.showMeVPower1A = !this.showMeVPower1A
  }

  vpower2A() {
    this.buttonDisableVpower2 = false
    this.showMeVPower2A = !this.showMeVPower2A
  }



  vpower1B() {

  }


  vpower2B() {

  }


  //guarda el detalle de numeracion de bomba de regular lado A isla 1
  guardarRegularA1(): void {

    this.gallonageResults();
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv();
        this.showMeCheck = true;
        this.showMeRegularCheck = false;
        this.showdigitButton();
        this.totalGallonsRegular();
        this.updateGallons();
        this.resetFormValuesNumbering();
      };

    });
  };

  //guarda el detalle de numeracion de bomba de super lado A Isla 1
  guardarSuperA1(): void {

    this.gallonageResults();
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv();
        this.showdigitButton();
        this.totalGallonsSuper();
        this.updateGallons();
        this.resetFormValuesNumbering();
      };
    });
  }


  //guarda el detalle de numeracion de bomba de diesel lado A Isla 1
  guardarDieselA1(): void {

    this.gallonageResults();
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv();
        this.showdigitButton();
        this.totalGallonsDiesel();
        this.updateGallons();
        this.resetFormValuesNumbering();

      };
    });
  };

  //guarda el detalle de numeracion de bomba de regular lado B isla 1
  guardarRegularB1(): void {

    this.gallonageResults();
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
        this.totalGallonsRegular();
        this.updateGallons();

        this.resetFormValuesNumbering();


      };

    });
  };

  //guarda el detalle de numeracion de bomba de super lado B Isla 1
  guardarSuperB1(): void {

    this.gallonageResults();
    //this.digitizeForm.controls['totalNoMoney'].setValue(this.resultadoMY);
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv();
        this.showdigitButton();
        this.totalGallonsSuper();
        this.updateGallons();
        this.resetFormValuesNumbering();
      };
    });
  };


  //guarda el detalle de numeracion de bomba de diesel lado B Isla 1
  guardarDieselB1(): void {

    this.gallonageResults();
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv();
        this.showdigitButton();
        this.totalGallonsDiesel();
        this.updateGallons();
        this.resetFormValuesNumbering();

      };
    });

  };

  //guarda el detalle de numeracion de bomba de regular lado A isla 2
  guardarRegularA2(): void {

    this.gallonageResults();
    this.getGeneralAssignmentDispenserReaderId();

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showdigitButton2();
        this.totalGallonsRegular();
        this.updateGallons();

        this.resetFormValuesNumbering();

      };

    });
  };


  //guarda el detalle de numeracion de bomba de super lado A Isla 1
  guardarSuperA2(): void {

    this.gallonageResults();
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showdigitButton2();
        this.totalGallonsSuper();
        this.updateGallons();
        this.resetFormValuesNumbering();
      };
    });
  }

  /**
   * guarda el detalle de numeracion de bomba de diesel lado A Isla 2
   * 
   * */
  guardarDieselA2(): void {

    this.gallonageResults();
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showdigitButton2();
        this.totalGallonsDiesel();
        this.updateGallons();
        this.resetFormValuesNumbering();

      };
    });
  };

  //guarda el detalle de numeracion de bomba de regular lado B isla 2
  guardarRegularB2(): void {

    this.gallonageResults();
    //this.digitizeForm.controls['totalNoMoney'].setValue(this.resultadoMY);
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showdigitButton2();
        this.totalGallonsRegular();
        this.updateGallons();
        this.resetFormValuesNumbering();

      };

    });
  };

  //guarda el detalle de numeracion de bomba de super lado B Isla 2
  guardarSuperB2(): void {

    this.gallonageResults();
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showdigitButton2();
        this.totalGallonsSuper();
        this.updateGallons();
        this.resetFormValuesNumbering();
      };
    });
  };


  //guarda el detalle de numeracion de bomba de diesel lado B Isla 1
  guardarDieselB2(): void {

    this.gallonageResults();
    this.digitizeForm.controls['totalNoMoney'].setValue(this.ResultMY);
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showdigitButton2();
        this.totalGallonsDiesel();
        this.updateGallons();
        this.resetFormValuesNumbering();

      };
    });

  };

  cancelarRegularA1() {
    this.HideMeDiv();
    this.showdigitButton();

  };

  cancelarRegularA2() {
    this.HideMeDiv2();
    this.showdigitButton2();

  };

  cancelarSuperA1() {
    this.HideMeDiv();
    this.showdigitButton();
  };

  cancelarSuperA2() {
    this.HideMeDiv2();
    this.showdigitButton2();
  };

  cancelarDieselA1() {
    this.HideMeDiv();
    this.showdigitButton();

  };

  cancelarDieselA2() {
    this.HideMeDiv2();
    this.showdigitButton2();

  };

  cancelarRegularB1() {
    this.HideMeDiv();
    this.showdigitButton();

  };

  cancelarRegularB2() {
    this.HideMeDiv2();
    this.showdigitButton2();

  };

  cancelarSuperB1() {
    this.HideMeDiv();
    this.showdigitButton();
  };

  cancelarSuperB2() {
    this.HideMeDiv2();
    this.showdigitButton2();
  };

  cancelarDieselB1() {
    this.HideMeDiv();
    this.showdigitButton();
  };

  cancelarDieselB2() {
    this.HideMeDiv2();
    this.showdigitButton2();
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


  HideMeDiv2() {

    this.showMeRegular2A = false;
    this.showMeSuper2A = false;
    this.showMeDiesel2A = false;
    this.showMeVPower2A = false;
    this.showMeRegular2B = false;
    this.showMeSuper2B = false;
    this.showMeDiesel2B = false;
    this.showMeVPower2B = false;
  };

  showdigitButton() {
    this.btnDisableRegularR1A = false
    this.btnDisableSuperR1A = false
    this.btnDisableDisableR1A = false
    this.btnDisableRegularR1B = false
    this.btnDisableSuperR1B = false
    this.btnDisableDieselR1B = false
  };

  showdigitButton2() {
    this.btnDisableRegularR2A = false
    this.btnDisableSuperR2A = false
    this.btnDisableDisableR2A = false
    this.btnDisableRegularR2B = false
    this.btnDisableSuperR2B = false
    this.btnDisableDieselR2B = false
  };


  //resetea los valores de numeracion a 0 del fomulario para que pueda ser reutilizable otros metodos
  resetFormValuesNumbering(): void {
    this.digitizeForm.controls['previuosNoGallons'].setValue(0);
    this.digitizeForm.controls['actualNoGallons'].setValue(0);
    this.digitizeForm.controls['previuosNoMechanic'].setValue(0);
    this.digitizeForm.controls['actualNoMechanic'].setValue(0);
    this.digitizeForm.controls['previuosNoMoney'].setValue(0);
    this.digitizeForm.controls['actualNoMoney'].setValue(0);

    this.digitizeForm.controls['totalGallonRegular'].setValue(0);
    this.digitizeForm.controls['totalMechanicRegular'].setValue(0);
    this.digitizeForm.controls['totalMoneyRegular'].setValue(0);
    /*this.digitizeForm.controls['totalGallonSuper'].setValue(0);
    this.digitizeForm.controls['totalMechanicSuper'].setValue(0);
    this.digitizeForm.controls['totalMoneySuper'].setValue(0);
    this.digitizeForm.controls['totalGallonDiesel'].setValue(0);
    this.digitizeForm.controls['totalMechanicDiesel'].setValue(0);
    this.digitizeForm.controls['totalMoneyDiesel'].setValue(0);
    this.digitizeForm.controls['totalGallonVpower'].setValue(0);
    this.digitizeForm.controls['totalMechanicVpower'].setValue(0);
    this.digitizeForm.controls['totalMoneyVpower'].setValue(0);*/

  };

  //mostar en tabla los registros actuales del dia almacenado
  listNumerationDispenser() {
    this.dispenserService.getActualListNumeration(this.digitizeForm.value)
      .subscribe(({ listNumerationDispenser }) => {
        this.dispenserReader = listNumerationDispenser


      });
  };

  //obtenemos el resultado de galonaje vendido de dia actual vs dia anterior
  gallonageResults() {
    this.gallonP = this.digitizeForm.get('previuosNoGallons')?.value;
    this.gallonA = this.digitizeForm.get('actualNoGallons')?.value;
    this.mechanicP = this.digitizeForm.get('previuosNoMechanic')?.value;
    this.mechanicA = this.digitizeForm.get('actualNoMechanic')?.value;
    this.moneyP = this.digitizeForm.get('previuosNoMoney')?.value;
    this.moneyA = this.digitizeForm.get('actualNoMoney')?.value;

    this.ResultG = this.gallonA - this.gallonP;
    this.ResultM = this.mechanicA - this.mechanicP;
    this.ResultMY = this.moneyA - this.moneyP;

    this.digitizeForm.controls['totalNoGallons'].setValue(this.ResultG);
    this.digitizeForm.controls['totalNoMechanic'].setValue(this.ResultM);
    this.digitizeForm.controls['totalNoMoney'].setValue(this.ResultMY);
  };


  totalGallonsRegular() {

    //sum of current data regular gallons with bd 
    this.RegularGDB = this.digitizeForm.get('totalGallonRegular')?.value;
    this.RegularGInput = this.digitizeForm.get('totalNoGallons')?.value;
    this.ResultRG = this.RegularGDB + this.RegularGInput;
    this.digitizeForm.controls['totalGallonRegular'].setValue(this.ResultRG);

    //sum of current data regular mechanic with bd 
    this.RegularMDB = this.digitizeForm.get('totalMechanicRegular')?.value;
    this.RegulaMGInput = this.digitizeForm.get('totalNoMechanic')?.value;
    this.ResultRM = this.RegularMDB + this.RegulaMGInput;
    this.digitizeForm.controls['totalMechanicRegular'].setValue(this.ResultRM);


    //sum of current data regular money with bd 
    this.RegularMYDB = this.digitizeForm.get('totalMoneyRegular')?.value;
    this.RegularMYInput = this.digitizeForm.get('totalNoMoney')?.value;
    this.ResultRMY = this.RegularMYDB + this.RegularMYInput;
    this.digitizeForm.controls['totalMoneyRegular'].setValue(this.ResultRMY);


  }

  totalGallonsSuper() {

    //sum of current data super gallons with bd 
    this.SuperGDB = this.digitizeForm.get('totalGallonSuper')?.value;
    this.SuperGInput = this.digitizeForm.get('totalNoGallons')?.value;
    this.ResultSG = this.SuperGDB + this.SuperGInput;
    this.digitizeForm.controls['totalGallonSuper'].setValue(this.ResultSG);


    //sum of current data super mechanic with bd 
    this.SuperMDB = this.digitizeForm.get('totalMechanicSuper')?.value;
    this.SuperMGInput = this.digitizeForm.get('totalNoMechanic')?.value;
    this.ResultSM = this.SuperMDB + this.SuperMGInput;
    this.digitizeForm.controls['totalMechanicSuper'].setValue(this.ResultSM);


    //sum of current data super money with bd 
    this.SuperMYDB = this.digitizeForm.get('totalMoneySuper')?.value;
    this.SuperMYInput = this.digitizeForm.get('totalNoMoney')?.value;
    this.ResultSMY = this.SuperMYDB + this.SuperMYInput;
    this.digitizeForm.controls['totalMoneySuper'].setValue(this.ResultSMY);


  }


  totalGallonsDiesel() {

    //sum of current data diesel gallons with bd 
    this.DieselGDB = this.digitizeForm.get('totalGallonDiesel')?.value;
    this.DieselGInput = this.digitizeForm.get('totalNoGallons')?.value;
    this.ResultDG = this.DieselGDB + this.DieselGInput;
    this.digitizeForm.controls['totalGallonDiesel'].setValue(this.ResultDG);


    //sum of current data diesel mechanic with bd 
    this.DieselMDB = this.digitizeForm.get('totalMechanicDiesel')?.value;
    this.DieselMGInput = this.digitizeForm.get('totalNoMechanic')?.value;
    this.ResultDM = this.DieselMDB + this.DieselMGInput;
    this.digitizeForm.controls['totalMechanicDiesel'].setValue(this.ResultDM);


    //sum of current data diesel money with bd 
    this.DieselMYDB = this.digitizeForm.get('totalMoneyDiesel')?.value;
    this.DieselMYInput = this.digitizeForm.get('totalNoMoney')?.value;
    this.ResultDMY = this.DieselMYDB + this.DieselMYInput;
    this.digitizeForm.controls['totalMoneyDiesel'].setValue(this.ResultDMY);


  }

  totalGallonsVpower() {

    //sum of current data vpower gallons with bd 
    this.VpowerGDB = this.digitizeForm.get('totalGallonVpower')?.value;
    this.VpowerGInput = this.digitizeForm.get('totalNoGallons')?.value;
    this.ResultVpG = this.VpowerGDB + this.VpowerGInput;
    this.digitizeForm.controls['totalGallonVpower'].setValue(this.ResultVpG);

    //sum of current data vpower mechanic with bd 
    this.VpowerMDB = this.digitizeForm.get('totalMechanicVpower')?.value;
    this.VpowerMGInput = this.digitizeForm.get('totalNoMechanic')?.value;
    this.ResultVpM = this.VpowerMDB + this.VpowerMGInput;
    this.digitizeForm.controls['totalMechanicVpower'].setValue(this.ResultVpM);


    //sum of current data vpower money with bd 
    this.VpowerMYDB = this.digitizeForm.get('totalMoneyVpower')?.value;
    this.VpowerMYInput = this.digitizeForm.get('totalNoMoney')?.value;
    this.ResultVpMY = this.VpowerMYDB + this.VpowerMYInput;
    this.digitizeForm.controls['totalMoneyVpower'].setValue(this.ResultVpMY);


  };

  updateGallons() {
    const data = {
      ...this.digitizeForm.value,

    };

    this.dispenserService.updateTotalGallons(data)
      .subscribe(resp => {

      });
  };

  editDisepnserReader(dispenserReader: DispenserReader) {

    this.dialog.open(UpdateDispenserReaderDialogComponent, {
      width: '45%',
      data: dispenserReader
    });

    //this.updateGallons();
    this.listNumerationDispenser();


  };


  save() {

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.listNumerationDispenser();
      }
    }
    )
  };


  calculate() {

  }


  //show all the parameters to present them again on the screen to update
  //mostrar todos los parametros para presentarlos nuevamente en pantalla para actualizar
  updateRegularA1() {

    this.getPreviuosNoGallons1();
    this.getPreviuosNoGallonsMechanicRegular1();
    this.getPreviuosNoGallonsMoneyRegular1();
    this.getTotalGallons();
    this.showMeRegular1A = !this.showMeRegular1A;
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {

        this.gallonA = this.digitizeForm.get('actualNoGallons')?.value;
        this.gallonP = this.digitizeForm.get('totalNoGallons')?.value;
        this.result_g = this.gallonA - this.gallonP;
        this.mechanicA = this.digitizeForm.get('actualNoMechanic')?.value
        this.mechanicP = this.digitizeForm.get('totalNoMechanic')?.value
        this.result_m = this.mechanicA - this.mechanicP;
        this.moneyA = this.digitizeForm.get('actualNoMoney')?.value;
        this.moneyP = this.digitizeForm.get('totalNoMoney')?.value;
        this.result_my = this.moneyA - this.moneyP;
        this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_g);
        this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_m);
        this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_my);
      }
    })

  }

  saveUpdateRegularA1(){
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.gallonageResults();
      this.calculateTotalGeneralGallons();
      this.updateDispenserReader();
      this.updaTotalGallons();
      this.updateGallons();
   
    })

  }

  //it comes frome API
  updateDispenserReader() {
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
  
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  calculateTotalGeneralGallons(){

    this.calculate_gallonA = this.digitizeForm.get('actualNoGallons')?.value
    this.calculate_gallonP = this.digitizeForm.get('previuosNoGallons')?.value
    this.calculate_result_g = this.calculate_gallonA - this.calculate_gallonP;
    this.digitizeForm.controls['totalGallonRegular'].setValue(this.calculate_result_g);
   
  
    this.calculate_mechanicA = this.digitizeForm.get('actualNoMechanic')?.value;
    this.calculate_mechanicP = this.digitizeForm.get('previuosNoMechanic')?.value;
    this.calculate_result_m = this.calculate_mechanicA - this.calculate_mechanicP;
    this.digitizeForm.controls['totalMechanicRegular'].setValue(this.calculate_result_m);
 

    this.calculate_moneyA = this.digitizeForm.get('actualNoMoney')?.value;
    this.calculate_moneyP = this.digitizeForm.get('previuosNoMoney')?.value;
    this.calculate_result_my = this.calculate_moneyA - this.calculate_moneyP;
    this.digitizeForm.controls['totalMoneyRegular'].setValue(this.calculate_result_my);

  }

  updaTotalGallons(){

    const data = {
      ...this.digitizeForm.value,
    };

    this.dispenserService.updateTotalGallons(data)
      .subscribe(resp => {

      });

  }
};

