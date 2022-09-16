import { DialogRef } from '@angular/cdk/dialog';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router, TitleStrategy } from '@angular/router';
import { Subscription } from 'rxjs';

import { AssignmentHose } from 'src/app/models/fuelstation/assignment.model';
import { DispenserReader, Dispensers, GeneralDispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { Island } from 'src/app/models/fuelstation/island.models';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { FuelInventoryService } from 'src/app/services/fuelstation/fuel-inventory.service';
import { HosesService } from 'src/app/services/fuelstation/hoses.service';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';
import { TimerComponent } from 'src/app/shared/functions/timer/timer.component';
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

  calculate_gallonAS!: Number | any;
  calculate_gallonPS!: Number | any;
  calculate_result_gS!: Number | any;
  calculate_mechanicAS!: Number | any;
  calculate_mechanicPS!: Number | any;
  calculate_result_mS!: Number | any;
  calculate_moneyAS!: Number | any;
  calculate_moneyPS!: Number | any;
  calculate_result_myS!: Number | any;

  calculate_gallonAD!: Number | any;
  calculate_gallonPD!: Number | any;
  calculate_result_gD!: Number | any;
  calculate_mechanicAD!: Number | any;
  calculate_mechanicPD!: Number | any;
  calculate_result_mD!: Number | any;
  calculate_moneyAD!: Number | any;
  calculate_moneyPD!: Number | any;
  calculate_result_myD!: Number | any;


  gallonA!: Number | any;
  gallonP!: Number | any;
  result_g!: Number | any;
  mechanicA!: Number | any;
  mechanicP!: Number | any;
  result_m!: Number | any;
  moneyA!: Number | any;
  moneyP!: Number | any;
  result_my!: Number | any;

  gallonAS!: Number | any;
  gallonPS!: Number | any;
  result_gS!: Number | any;
  mechanicAS!: Number | any;
  mechanicPS!: Number | any;
  result_mS!: Number | any;
  moneyAS!: Number | any;
  moneyPS!: Number | any;
  result_myS!: Number | any;

  gallonAD!: Number | any;
  gallonPD!: Number | any;
  result_gD!: Number | any;
  mechanicAD!: Number | any;
  mechanicPD!: Number | any;
  result_mD!: Number | any;
  moneyAD!: Number | any;
  moneyPD!: Number | any;
  result_myD!: Number | any;
  result!: Number | any;


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
  showMeRCheck: boolean = false;
  showMeR2Check: boolean = false;
  showMeR3Check: boolean = false;
  showMeR4Check: boolean = false;
  showMeSCheck: boolean = false;
  showMeS2Check: boolean = false;
  showMeS3Check: boolean = false;
  showMeS4Check: boolean = false;
  showMeDCheck: boolean = false;
  showMeD2Check: boolean = false;
  showMeD3Check: boolean = false;
  showMeD4Check: boolean = false;
  showMeRegularCheck: boolean = true;
  showMeRegular2Check: boolean = true;
  showMeRegular3Check: boolean = true;
  showMeRegular4Check: boolean = true;
  showMeSuperCheck: boolean = true;
  showMeSuper2Check: boolean = true;
  showMeSuper3Check: boolean = true;
  showMeSuper4Check: boolean = true;
  showMeDieselCheck: boolean = true;
  showMeDiesel2Check: boolean = true;
  showMeDiesel3Check: boolean = true;
  showMeDiesel4Check: boolean = true;
  showMeUpdateRA1: boolean = false;
  showMeUpdateRB1: boolean = false;
  showMeUpdateRA2: boolean = false;
  showMeUpdateRB2: boolean = false;
  showMeUpdateSA1: boolean = false;
  showMeUpdateSA2: boolean = false;
  showMeUpdateSB1: boolean = false;
  showMeUpdateSB2: boolean = false;
  showMeUpdateDA1: boolean = false;
  showMeUpdateDB1: boolean = false;
  showMeUpdateDA2: boolean = false;
  showMeUpdateDB2: boolean = false;
  buttonDisableRegularEdit: boolean = false;
  buttonDisableRegular2Edit: boolean = false;
  buttonDisableRegular3Edit: boolean = false;
  buttonDisableRegular4Edit: boolean = false;
  buttonDisableSuperEdit: boolean = false;
  buttonDisableSuper2Edit: boolean = false;
  buttonDisableSuper3Edit: boolean = false;
  buttonDisableSuper4Edit: boolean = false;
  buttonDisableDieselEdit: boolean = false;
  buttonDisableDiesel2Edit: boolean = false;
  buttonDisableDiesel3Edit: boolean = false;
  buttonDisableDiesel4Edit: boolean = false;
  buttonDisableRegular: boolean = true;

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

  buttonDisableRegular2: boolean = true;
  buttonDisableRegularB2: boolean = true;
  buttonDisableRegularA2: boolean = true;
  buttonDisableSuper: boolean = true;
  buttonDisableSuper2: boolean = true;
  buttonDisableSuperB2: boolean = true;
  buttonDisableSuperA2: boolean = true;
  buttonDisableDiesel: boolean = true;
  buttonDisableDieselB2: boolean = false;
  buttonDisableDiesel2: boolean = true;
  buttonDisableDieselA2: boolean = true;
  buttonDisableVpower: boolean = true;
  buttonDisableVpower2: boolean = true;
  buttonDisableRegularB: boolean = false;
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
    totalGallonRegular: ['0', Validators.required],
    totalMechanicRegular: ['0', Validators.required],
    totalMoneyRegular: ['0', Validators.required],
    totalGallonSuper: ['0', Validators.required],
    totalMechanicSuper: ['0', Validators.required],
    totalMoneySuper: ['0', Validators.required],
    totalGallonDiesel: ['0', Validators.required],
    totalMechanicDiesel: ['0', Validators.required],
    totalMoneyDiesel: ['0', Validators.required],
    totalGallonVpower: ['0', Validators.required],
    totalMechanicVpower: ['0', Validators.required],
    totalMoneyVpower: ['0', Validators.required],
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
    generalDispenserReaderId: ['', Validators.required],
    applied: [false, Validators.required],
    available: ['', Validators.required],
    fuelId: ['', Validators.required],
    hoseId: ['', Validators.required],
    code: ['', Validators.required]

  });



  constructor(
    private fb: FormBuilder,
    private islandService: IslandsService,
    private dispenserService: DispensersService,
    private fuelInventoryService: FuelInventoryService,
    private hoseService: HosesService,
    private dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar


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



  getHoseIdByAssignmentHoseId() {
    this.hoseService.getHoseIdByAssignmentId(this.digitizeForm.value)
      .subscribe(({ hhose }) => {
        this.digitizeForm.controls['hoseId'].setValue(hhose.hoseId);
      });
  };

  getFuelIdByHoseId() {
    this.hoseService.getFuelIdByHoseId(this.digitizeForm.value)
      .subscribe(({ fuelId }) => {
        this.digitizeForm.controls['fuelId'].setValue(fuelId.fuelId);
      });
  };

  getAvailable() {
    this.fuelInventoryService.getFuelInventoryAvailable(this.digitizeForm.value)
      .subscribe(({ fuelInventoryAvailable }) => {
        this.digitizeForm.controls['available'].setValue(fuelInventoryAvailable.available);
        console.log(fuelInventoryAvailable.available)
      });
  };

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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
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
        this.digitizeForm.controls['code'].setValue(data.assignmenHose.hoseId?.code);
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')

      });
  };

  //apertura de dia
  aperturar() {

    if (this.digitizeForm.get('readingDate')?.value == '') {
      return
    };

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
      .subscribe((previousNoGallonsRegular) => {
        this.digitizeForm.controls['actualNoGallons'].setValue(previousNoGallonsRegular.previousNoGallonsRegular.actualNoGallons);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousNoGallonsRegular.previousNoGallonsRegular.dispenserReaderId);

      });
  };

  getTotalNoGallonsRegular() {
    this.dispenserService.getTotalNoGallonsRegular(this.digitizeForm.value)
      .subscribe((previousTotalNoGallonRegular) => {
        this.digitizeForm.controls['totalNoGallons'].setValue(previousTotalNoGallonRegular.previousTotalNoGallonRegular.totalNoGallons);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousTotalNoGallonRegular.previousTotalNoGallonRegular.dispenserReaderId);
      });
  };

  getTotalNoMechanicRegular() {
    this.dispenserService.getTotalNoMechanicRegular(this.digitizeForm.value)
      .subscribe((previousTotalNoMechanicRegular) => {
        this.digitizeForm.controls['totalNoMechanic'].setValue(previousTotalNoMechanicRegular.previousTotalNoMechanicRegular.totalNoMechanic);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousTotalNoMechanicRegular.previousTotalNoMechanicRegular.dispenserReaderId);

      });
  };

  getTotalNoMoneyRegular() {
    this.dispenserService.getTotalNoMoneyRegular(this.digitizeForm.value)
      .subscribe((previousTotalNoMoneyRegular) => {
        this.digitizeForm.controls['totalNoMechanic'].setValue(previousTotalNoMoneyRegular.previousTotalNoMoneyRegular.totalNoMoney);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousTotalNoMoneyRegular.previousTotalNoMoneyRegular.dispenserReaderId);

      });
  };

  getTotalNoGallonsSuper() {
    this.dispenserService.getTotalNoGallonsSuper(this.digitizeForm.value)
      .subscribe((previousTotalNoGallonsSuper) => {
        this.digitizeForm.controls['totalNoGallons'].setValue(previousTotalNoGallonsSuper.previousTotalNoGallonsSuper.totalNoGallons);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousTotalNoGallonsSuper.previousTotalNoGallonsSuper.dispenserReaderId);

      });
  };

  getTotalNoMechanicSuper() {
    this.dispenserService.getTotalNoMechanicSuper(this.digitizeForm.value)
      .subscribe((previousTotalNoMechanicSuper) => {
        this.digitizeForm.controls['totalNoMechanic'].setValue(previousTotalNoMechanicSuper.previousTotalNoMechanicSuper.totalNoMechanic);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousTotalNoMechanicSuper.previousTotalNoMechanicSuper.dispenserReaderId);

      });
  };

  getTotalNoMoneySuper() {
    this.dispenserService.getTotalNoMoneySuper(this.digitizeForm.value)
      .subscribe((previousTotalNoMoneySuper) => {
        this.digitizeForm.controls['totalNoMechanic'].setValue(previousTotalNoMoneySuper.previousTotalNoMoneySuper.totalNoMoney);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousTotalNoMoneySuper.previousTotalNoMoneySuper.dispenserReaderId);

      });
  };

  getTotalNoGallonsDiesel() {
    this.dispenserService.getTotalNoGallonsDiesel(this.digitizeForm.value)
      .subscribe((previousTotalNoGallonsDiesel) => {
        this.digitizeForm.controls['totalNoGallons'].setValue(previousTotalNoGallonsDiesel.previousTotalNoGallonsDiesel.totalNoGallons);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousTotalNoGallonsDiesel.previousTotalNoGallonsDiesel.dispenserReaderId);

      });
  };

  getTotalNoMechanicDiesel() {
    this.dispenserService.getTotalNoMechanicDiesel(this.digitizeForm.value)
      .subscribe((previousTotalNoMechanicDiesel) => {
        this.digitizeForm.controls['totalNoMechanic'].setValue(previousTotalNoMechanicDiesel.previousTotalNoMechanicDiesel.totalNoMechanic);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousTotalNoMechanicDiesel.previousTotalNoMechanicDiesel.dispenserReaderId);

      });
  };

  getTotalNoMoneyDiesel() {
    this.dispenserService.getTotalNoMoneyDiesel(this.digitizeForm.value)
      .subscribe((previousTotalNoMoneyDiesel) => {
        this.digitizeForm.controls['totalNoMechanic'].setValue(previousTotalNoMoneyDiesel.previousTotalNoMoneyDiesel.totalNoMoney);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousTotalNoMoneyDiesel.previousTotalNoMoneyDiesel.dispenserReaderId);

      });
  };


  getPreviuosNoGallonsMechanicRegular1() {
    this.dispenserService.getPreviousGallonsMechanic1(this.digitizeForm.value)
      .subscribe((previousNoMechanicRegular) => {
        this.digitizeForm.controls['actualNoMechanic'].setValue(previousNoMechanicRegular.previousNoMechanicRegular.actualNoMechanic);
      });
  };

  getPreviuosNoGallonsMoneyRegular1() {
    this.dispenserService.getPreviousGallonsMoney1(this.digitizeForm.value)
      .subscribe((previousNoMoneyRegular) => {
        this.digitizeForm.controls['actualNoMoney'].setValue(previousNoMoneyRegular.previousNoMoneyRegular.actualNoMoney);
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
      .subscribe(({ previousNoMechanicR }) => {
        this.dispenserReaderM = previousNoMechanicR
      });
  };



  getPreviuosNoMoney() {
    this.dispenserService.getPreviousMoney(this.digitizeForm.value)
      .subscribe(({ previousNoMoneyR }) => {
        this.dispenserReaderMY = previousNoMoneyR
      });
  };


  getPreviuosNoGallonsSuper() {
    this.dispenserService.getPreviousGallonsSuper(this.digitizeForm.value)
      .subscribe(({ previousNoGallonsSuper }) => {
        this.dispenserReaderG = previousNoGallonsSuper
      });
  };

  getPreviuosNoMechanicSuper() {
    this.dispenserService.getPreviousMechanicSuper(this.digitizeForm.value)
      .subscribe(({ previousNoMechanicSuper }) => {
        this.dispenserReaderM = previousNoMechanicSuper
      });
  };

  getPreviuosNoMoneySuper() {
    this.dispenserService.getPreviousMoneySuper(this.digitizeForm.value)
      .subscribe(({ previousNoMoneySuper }) => {
        this.dispenserReaderMY = previousNoMoneySuper
      });
  };

  getPreviuosNoGallonsSuper1() {
    this.dispenserService.getPreviousGallonsSuper1(this.digitizeForm.value)
      .subscribe((previousNoGallonsSuper1) => {
        this.digitizeForm.controls['actualNoGallons'].setValue(previousNoGallonsSuper1.previousNoGallonsSuper1.actualNoGallons);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousNoGallonsSuper1.previousNoGallonsSuper1.dispenserReaderId);


      });
  };

  getPreviuosNoGallonsMechanicSuper1() {
    this.dispenserService.getPreviousGallonsMechanicSuper1(this.digitizeForm.value)
      .subscribe((previousNoMechanicSuper1) => {
        this.digitizeForm.controls['actualNoMechanic'].setValue(previousNoMechanicSuper1.previousNoMechanicSuper1.actualNoMechanic);
      });
  };

  getPreviuosNoGallonsMoneySuper1() {
    this.dispenserService.getPreviousGallonsMoneySuper1(this.digitizeForm.value)
      .subscribe((previousNoMoneySuper1) => {
        this.digitizeForm.controls['actualNoMoney'].setValue(previousNoMoneySuper1.previousNoMoneySuper1.actualNoMoney);
      });
  };


  getPreviuosNoGallonsDiesel() {
    this.dispenserService.getPreviousGallonsDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoGallonsDiesel }) => {
        this.dispenserReaderG = previousNoGallonsDiesel
      });
  };

  getPreviuosNoMechanicDiesel() {
    this.dispenserService.getPreviousMechanicDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoMechanicDiesel }) => {
        this.dispenserReaderM = previousNoMechanicDiesel
      });
  };

  getPreviuosNoMoneyDiesel() {
    this.dispenserService.getPreviousMoneyDiesel(this.digitizeForm.value)
      .subscribe(({ previousNoMoneyDiesel }) => {
        this.dispenserReaderMY = previousNoMoneyDiesel
      });
  };


  getPreviuosNoGallonsDiesel1() {
    this.dispenserService.getPreviousGallonsDiesel1(this.digitizeForm.value)
      .subscribe((previousNoGallonsDiesel1) => {
        this.digitizeForm.controls['actualNoGallons'].setValue(previousNoGallonsDiesel1.previousNoGallonsDiesel1.actualNoGallons);
        this.digitizeForm.controls['dispenserReaderId'].setValue(previousNoGallonsDiesel1.previousNoGallonsDiesel1.dispenserReaderId);
      });
  };

  getPreviuosNoGallonsMechanicDiesel1() {
    this.dispenserService.getPreviousMechanicDiesel1(this.digitizeForm.value)
      .subscribe((previousNoMechanicDiesel1) => {
        this.digitizeForm.controls['actualNoMechanic'].setValue(previousNoMechanicDiesel1.previousNoMechanicDiesel1.actualNoMechanic);
      });
  };

  getPreviuosNoGallonsMoneyDiesel1() {
    this.dispenserService.getPreviousMoneyDiesel1(this.digitizeForm.value)
      .subscribe((previousNoMoneyDiesel1) => {
        this.digitizeForm.controls['actualNoMoney'].setValue(previousNoMoneyDiesel1.previousNoMoneyDiesel1.actualNoMoney);
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
      });
  };


  //aperturar manguera Regular lado A Isla 1
  regular1A() {
    this.getAssignmentHoseIdRegularA1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.btnDisableRegularR1A = true;
          this.btnDisableSuperR1A = true;
          this.btnDisableDisableR1A = true;
          this.btnDisableRegularR1B = true;
          this.btnDisableSuperR1B = true;
          this.btnDisableDieselR1B = true;
          this.buttonDisableRegular = true;
          this.showMeRegular1A = !this.showMeRegular1A;
        })
        this.getAvailable();
      };
    });

    this.resetFormValuesNumbering();
  };

  //update numbering gallons on regular
  regular1Aupdate() {
    this.getAssignmentHoseIdRegularA1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
  };

  //aperturar manguera Super lado A Isla 1
  super1A() {
    console.log(this.digitizeForm.value);
    this.getAssignmentHoseIdSuperA1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    console.log(this.digitizeForm.value)
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        console.log(this.digitizeForm.value)
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.buttonDisableSuper = true
          this.btnDisableRegularR1A = true;
          this.btnDisableDisableR1A = true
          this.btnDisableRegularR1B = true
          this.btnDisableSuperR1B = true
          this.btnDisableDieselR1B = true
          this.buttonDisableRegular = false
          this.showMeSuper1A = !this.showMeSuper1A
          this.btnDisableRegularR1A = true;
          this.btnDisableDisableR1A = true
          this.btnDisableRegularR1B = true
          this.btnDisableSuperR1B = true
          this.btnDisableDieselR1B = true
          this.buttonDisableRegular = false
          this.btnDisableSuperR1A = true;

        })


      };
    });
    this.resetFormValuesNumbering();
  };

  diesel1A() {
    this.getAssignmentHoseIdDieselA1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        console.log(this.digitizeForm.value)
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
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
        })
        this.getAvailable();
        console.log(this.digitizeForm.value)
      };
    });
    this.resetFormValuesNumbering();
  };

  //aperturar manguera Regular lado B Isla 1
  regular1B() {
    this.getAssignmentHoseIdRegularB1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.buttonDisableRegular = false
          this.buttonDisableRegularB = true
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
        })
        this.getAvailable();
      };
    });
    this.resetFormValuesNumbering();
  };

  //aperturar manguera Regular lado B Isla 1
  super1B() {
    this.getAssignmentHoseIdSuperB1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.buttonDisableSuper = false
          this.btnDisableRegularR1A = true
          this.btnDisableDisableR1A = true
          this.btnDisableRegularR1B = true
          this.btnDisableSuperR1B = true
          this.btnDisableDieselR1B = true
          this.buttonDisableRegular = false
          this.showMeSuper1B = !this.showMeSuper1B
          this.buttonDisableSuperB = true
          this.btnDisableRegularR1A = true
          this.btnDisableDisableR1A = true
          this.btnDisableRegularR1B = true
          this.btnDisableSuperR1B = true
          this.btnDisableDieselR1B = true
          this.buttonDisableRegular = false
        })
        this.getAvailable();

      };
    });
    this.resetFormValuesNumbering();
  };

  diesel1B() {
    this.getAssignmentHoseIdDieselB1();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.buttonDisableDieselB = true
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
        })
        this.getAvailable();
      };
    });
    this.resetFormValuesNumbering();
  };

  //aperturar manguera Regular lado A Isla 2
  regular2A() {
    this.getAssignmentHoseIdRegularA2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
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
        })
        this.resetFormValuesNumbering();
      };
    });
    this.resetFormValuesNumbering();
  };

  //aperturar manguera Super lado A Isla 2
  super2A() {
    this.getAssignmentHoseIdSuperA2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
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
        })
        this.getAvailable();
      };
    });
    this.resetFormValuesNumbering();
  };

  //aperturar manguera Diesel lado A Isla 2
  diesel2A() {
    this.getAssignmentHoseIdDieselA2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
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
          
        })
        this.getAvailable();
      };
    });
    this.resetFormValuesNumbering();
  };

  //aperturar manguera Regular lado B Isla 2
  regular2B() {
    this.getAssignmentHoseIdRegularB2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.buttonDisableRegular2 = false;
          this.buttonDisableRegularB2 = true;
          this.showMeRegular2B = !this.showMeRegular2B;
          this.btnDisableRegularR2A = true;
          this.btnDisableSuperR2A = true;
          this.btnDisableDisableR2A = true;
          this.btnDisableSuperR2B = true;
          this.btnDisableDieselR2B = true;
          this.btnDisableSuperR2A = true;
          this.btnDisableDisableR2A = true;
          this.btnDisableRegularR2B = true;
          this.btnDisableSuperR2B = true;
          this.btnDisableDieselR2B = true;
        })
        this.getAvailable();
      };
    });
    this.resetFormValuesNumbering();
  };


  //aperturar manguera Regular lado B Isla 2
  super2B() {
    this.getAssignmentHoseIdSuperB2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId()
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.buttonDisableSuper2 = false;
          this.btnDisableRegularR2A = true;
          this.btnDisableDisableR2A = true;
          this.btnDisableRegularR2B = true;
          this.btnDisableSuperR2B = true;
          this.btnDisableDieselR2B = true;
          this.buttonDisableRegular2 = false;
          this.showMeSuper2B = !this.showMeSuper2B
          this.buttonDisableSuperB2 = true;
          this.btnDisableRegularR2A = true;
          this.btnDisableDisableR2A = true;
          this.btnDisableRegularR2B = true;
          this.btnDisableSuperR2B = true;
          this.btnDisableDieselR2B = true;
          this.buttonDisableRegular2 = false;
        })
        this.getAvailable();
      };
    });
    this.resetFormValuesNumbering();
  };


  diesel2B() {
    this.getAssignmentHoseIdDieselB2();
    this.getGeneralAssignmentDispenserReaderId();
    this.getTotalGallons();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
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
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef1 = this._snackBar.openFromComponent(TimerComponent, { duration: 1000 });
        snackBarRef1.afterDismissed().subscribe(() => {
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.buttonDisableDieselB2 = true
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
        })
        this.getAvailable();
      };
    });
    this.resetFormValuesNumbering();
  };

  //guarda el detalle de numeracion de bomba de regular lado A isla 1
  guardarRegularA1(): void {

    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }

    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv();
        this.showMeRCheck = true;
        this.showMeRegularCheck = false;
        this.showdigitButton();
        this.totalGallonsRegular();
        this.updateGallons();
        this.showMeUpdateRA1 = true;
        this.resetFormValuesNumbering();
      };
    });
  };

  //guarda el detalle de numeracion de bomba de super lado A Isla 1
  guardarSuperA1(): void {

    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv();
        this.showMeSCheck = true;
        this.showMeSuperCheck = false;
        this.showdigitButton();
        this.totalGallonsSuper();
        this.updateGallons();
        this.showMeUpdateSA1 = true;
        this.buttonDisableSuper = false;
        this.resetFormValuesNumbering();
      };
    });
  };


  //guarda el detalle de numeracion de bomba de diesel lado A Isla 1
  guardarDieselA1(): void {

    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv();
        this.showMeDCheck = true;
        this.showMeDieselCheck = false;
        this.showdigitButton();
        this.totalGallonsDiesel();
        this.updateGallons();
        this.showMeUpdateDA1 = true;
        this.resetFormValuesNumbering();
      };
    });
  };

  //guarda el detalle de numeracion de bomba de regular lado B isla 1
  guardarRegularB1(): void {

    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getGeneralAssignmentDispenserReaderId();

    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv();
        this.showMeR2Check = true;
        this.showMeRegular2Check = false;
        this.showdigitButton();
        this.totalGallonsRegular();
        this.updateGallons();
        this.showMeUpdateRB1 = true;
        this.resetFormValuesNumbering();
      };
    });
  };

  //guarda el detalle de numeracion de bomba de super lado B Isla 1
  guardarSuperB1(): void {

    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    //this.digitizeForm.controls['totalNoMoney'].setValue(this.resultadoMY);
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv();
        this.showMeS2Check = true;
        this.showMeSuper2Check = false;
        this.showdigitButton();
        this.totalGallonsSuper();
        this.updateGallons();
        this.showMeUpdateSB1 = true;
        this.buttonDisableSuper2 = false;
        this.resetFormValuesNumbering();
      };
    });
  };


  //guarda el detalle de numeracion de bomba de diesel lado B Isla 1
  guardarDieselB1(): void {

    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv();
        this.showMeD2Check = true;
        this.showMeDiesel2Check = false;
        this.showdigitButton();
        this.totalGallonsDiesel();
        this.updateGallons();
        this.showMeUpdateDB1 = true;
        this.resetFormValuesNumbering();
      };
    });
  };

  //guarda el detalle de numeracion de bomba de regular lado A isla 2
  guardarRegularA2(): void {
    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showMeR3Check = true;
        this.showMeRegular3Check = false;
        this.showdigitButton2();
        this.totalGallonsRegular();
        this.updateGallons();
        this.showMeUpdateRA2 = true;
        this.resetFormValuesNumbering();
      };
    });
  };


  //guarda el detalle de numeracion de bomba de super lado A Isla 1
  guardarSuperA2(): void {

    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showMeS3Check = true;
        this.showMeSuper3Check = false;
        this.showdigitButton2();
        this.totalGallonsSuper();
        this.updateGallons();
        this.showMeUpdateSA2 = true;
        this.resetFormValuesNumbering();
      };
    });
  };

  /**
   ** guarda el detalle de numeracion de bomba de diesel lado A Isla 2
   * 
   * */
  guardarDieselA2(): void {

    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showMeD3Check = true;
        this.showMeDiesel3Check = false;
        this.showdigitButton2();
        this.totalGallonsDiesel();
        this.updateGallons();
        this.showMeUpdateDA2 = true;
        this.resetFormValuesNumbering();

      };
    });
  };

  //guarda el detalle de numeracion de bomba de regular lado B isla 2
  guardarRegularB2(): void {
    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showMeR4Check = true;
        this.showMeRegular4Check = false;
        this.showdigitButton2();
        this.totalGallonsRegular();
        this.updateGallons();
        this.showMeUpdateRB2 = true;
        this.resetFormValuesNumbering();
      };

    });
  };

  //guarda el detalle de numeracion de bomba de super lado B Isla 2
  guardarSuperB2(): void {
    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showMeS4Check = true;
        this.showMeSuper4Check = false;
        this.showdigitButton2();
        this.totalGallonsSuper();
        this.updateGallons();
        this.showMeUpdateSB2 = true;
        this.resetFormValuesNumbering();

      };
    });
  };


  //guarda el detalle de numeracion de bomba de diesel lado B Isla 1
  guardarDieselB2(): void {

    this.gallonageResults();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.digitizeForm.controls['totalNoMoney'].setValue(this.ResultMY);
    this.getGeneralAssignmentDispenserReaderId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.createDispenserReader();
        this.HideMeDiv2();
        this.showMeD4Check = true;
        this.showMeDiesel4Check = false;
        this.showdigitButton2();
        this.totalGallonsDiesel();
        this.updateGallons();
        this.showMeUpdateDB2 = true;
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
    this.digitizeForm.controls['totalGallonSuper'].setValue(0);
    this.digitizeForm.controls['totalMechanicSuper'].setValue(0);
    this.digitizeForm.controls['totalMoneySuper'].setValue(0);
    this.digitizeForm.controls['totalGallonDiesel'].setValue(0);
    this.digitizeForm.controls['totalMechanicDiesel'].setValue(0);
    this.digitizeForm.controls['totalMoneyDiesel'].setValue(0);
  };

  //mostar en tabla los registros actuales del dia almacenado
  listNumerationDispenser() {
    this.dispenserService.getActualListNumeration(this.digitizeForm.value)
      .subscribe(({ listNumerationDispenser }) => {
        this.dispenserReader = listNumerationDispenser;
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

  //obtenemos el resultado de galonaje vendido de dia actual vs dia anterior
  gallonageResultsRegularUpdte() {
    this.gallonPS = this.digitizeForm.get('totalGallonRegular')?.value;
    this.gallonAS = this.digitizeForm.get('actualNoGallons')?.value;
    this.mechanicPS = this.digitizeForm.get('totalMechanicRegular')?.value;
    this.mechanicAS = this.digitizeForm.get('actualNoMechanic')?.value;
    this.moneyPS = this.digitizeForm.get('totalMoneyRegular')?.value;
    this.moneyAS = this.digitizeForm.get('actualNoMoney')?.value;
    this.ResultSG = this.gallonAS - this.gallonPS;
    this.ResultSM = this.mechanicAS - this.mechanicPS;
    this.result_myS = this.moneyAS - this.moneyPS;
    this.digitizeForm.controls['totalNoGallons'].setValue(this.ResultSG);
    this.digitizeForm.controls['totalNoMechanic'].setValue(this.ResultSM);
    this.digitizeForm.controls['totalNoMoney'].setValue(this.result_myS);
  };

  //obtenemos el resultado de galonaje vendido de dia actual vs dia anterior
  gallonageResultsSuperUpdte() {
    this.gallonPS = this.digitizeForm.get('totalGallonSuper')?.value;
    this.gallonAS = this.digitizeForm.get('actualNoGallons')?.value;
    this.mechanicPS = this.digitizeForm.get('totalMechanicSuper')?.value;
    this.mechanicAS = this.digitizeForm.get('actualNoMechanic')?.value;
    this.moneyPS = this.digitizeForm.get('totalMoneySuper')?.value;
    this.moneyAS = this.digitizeForm.get('actualNoMoney')?.value;
    this.ResultSG = this.gallonAS - this.gallonPS;
    this.ResultSM = this.mechanicAS - this.mechanicPS;
    this.result_myS = this.moneyAS - this.moneyPS;
    this.digitizeForm.controls['totalNoGallons'].setValue(this.ResultSG);
    this.digitizeForm.controls['totalNoMechanic'].setValue(this.ResultSM);
    this.digitizeForm.controls['totalNoMoney'].setValue(this.result_myS);
  };

  gallonageResultsDieselUpdte() {
    this.gallonPD = this.digitizeForm.get('previuosNoGallons')?.value;
    this.gallonAD = this.digitizeForm.get('actualNoGallons')?.value;
    this.mechanicPD = this.digitizeForm.get('previuosNoMechanic')?.value;
    this.mechanicAD = this.digitizeForm.get('actualNoMechanic')?.value;
    this.moneyPD = this.digitizeForm.get('previuosNoMoney')?.value;
    this.moneyAD = this.digitizeForm.get('actualNoMoney')?.value;
    this.ResultDG = this.gallonAD - this.gallonPD;
    this.ResultDM = this.mechanicAD - this.mechanicPD;
    this.result_myD = this.moneyAD - this.moneyPD;
    this.digitizeForm.controls['totalNoGallons'].setValue(this.ResultDG);
    this.digitizeForm.controls['totalNoMechanic'].setValue(this.ResultDM);
    this.digitizeForm.controls['totalNoMoney'].setValue(this.result_myD);
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
  };

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

      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
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
      };
    })
  };


  //show all the parameters to present them again on the screen to update
  //mostrar todos los parametros para presentarlos nuevamente en pantalla para actualizar
  updateRegularA1() {

    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdRegularA1();
    this.getPreviuosNoGallons1();
    this.getPreviuosNoGallonsMechanicRegular1();
    this.getPreviuosNoGallonsMoneyRegular1();
    this.getTotalNoGallonsRegular();
    this.getTotalNoMechanicRegular();
    this.getTotalNoMoneyDiesel();
    this.getTotalGallons();
    this.gallonageResultsRegularUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdRegularA1();
        this.getPreviuosNoGallons1();
        this.getPreviuosNoGallonsMechanicRegular1();
        this.getPreviuosNoGallonsMoneyRegular1();
        this.getTotalGallons();
        this.getTotalNoGallonsRegular();
        this.getTotalNoMechanicRegular();
        this.getTotalNoMoneyDiesel();
        this.gallonageResultsRegularUpdte();
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.getGeneralAssignmentDispenserReaderId();
          this.getAssignmentHoseIdRegularA1();
          this.getPreviuosNoGallons1();
          this.getPreviuosNoGallonsMechanicRegular1();
          this.getPreviuosNoGallonsMoneyRegular1();
          this.getTotalGallons();
          this.getTotalNoGallonsRegular();
          this.getTotalNoMechanicRegular();
          this.getTotalNoMoneyDiesel();
          this.gallonageResultsRegularUpdte();
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.gallonA = this.digitizeForm.get('actualNoGallons')?.value;
          this.gallonP = this.digitizeForm.get('totalNoGallons')?.value;
          this.result_g = this.gallonA - this.gallonP;
          this.mechanicA = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicP = this.digitizeForm.get('totalMechanicRegular')?.value
          this.result_m = this.mechanicA - this.mechanicP;
          this.moneyA = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyP = this.digitizeForm.get('totalMoneyRegular')?.value;
          this.result_my = this.moneyA - this.moneyP;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_g);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_m);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_my);
          this.buttonDisableRegular = false;
          this.buttonDisableRegularEdit = true;
          this.showMeRegular1A = true;

          const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
          snackBarRef.afterDismissed().subscribe(() => {
            this.gallonA = this.digitizeForm.get('actualNoGallons')?.value;
            this.gallonP = this.digitizeForm.get('totalNoGallons')?.value;
            this.result_g = this.gallonA - this.gallonP;
            this.mechanicA = this.digitizeForm.get('actualNoMechanic')?.value
            this.mechanicP = this.digitizeForm.get('totalMechanicRegular')?.value
            this.result_m = this.mechanicA - this.mechanicP;
            this.moneyA = this.digitizeForm.get('actualNoMoney')?.value;
            this.moneyP = this.digitizeForm.get('totalMoneyRegular')?.value;
            this.result_my = this.moneyA - this.moneyP;
            this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_g);
            this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_m);
            this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_my);
            this.buttonDisableRegular = false;
            this.buttonDisableRegularEdit = true;
            this.showMeRegular1A = true;
          });
        });
      };
    });
  };

  updateSuperA1() {
    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdSuperA1();
    this.getPreviuosNoGallonsSuper1();
    this.getPreviuosNoGallonsMechanicSuper1();
    this.getPreviuosNoGallonsMoneySuper1();
    this.getTotalNoGallonsSuper();
    this.getTotalNoMechanicSuper();
    this.getTotalNoMoneySuper();
    this.getTotalGallons();
    this.gallonageResultsSuperUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdSuperA1();
        this.getPreviuosNoGallonsSuper1();
        this.getPreviuosNoGallonsMechanicSuper1();
        this.getPreviuosNoGallonsMoneySuper1();
        this.getTotalNoGallonsSuper();
        this.getTotalNoMechanicSuper();
        this.getTotalNoMoneySuper();
        this.getTotalGallons();
        this.gallonageResultsSuperUpdte();
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.getGeneralAssignmentDispenserReaderId();
          this.getAssignmentHoseIdSuperA1();
          this.getPreviuosNoGallonsSuper1();
          this.getPreviuosNoGallonsMechanicSuper1();
          this.getPreviuosNoGallonsMoneySuper1();
          this.getTotalNoGallonsSuper();
          this.getTotalNoMechanicSuper();
          this.getTotalNoMoneySuper();
          this.getTotalGallons();
          this.gallonageResultsSuperUpdte();
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.gallonAS = this.digitizeForm.get('actualNoGallons')?.value;
          this.gallonPS = this.digitizeForm.get('totalGallonSuper')?.value;
          this.result_gS = this.gallonAS - this.gallonPS;
          this.mechanicAS = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicPS = this.digitizeForm.get('totalMechanicSuper')?.value
          this.result_mS = this.mechanicAS - this.mechanicPS;
          this.moneyAS = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyPS = this.digitizeForm.get('totalMoneySuper')?.value;
          this.result_myS = this.moneyAS - this.moneyPS;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gS);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mS);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myS);
          this.buttonDisableSuper = false;
          this.buttonDisableSuperEdit = true;
          this.showMeSuper1A = true;
          const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
          snackBarRef.afterDismissed().subscribe(() => {
            this.gallonAS = this.digitizeForm.get('actualNoGallons')?.value;
            this.gallonPS = this.digitizeForm.get('totalGallonSuper')?.value;
            this.result_gS = this.gallonAS - this.gallonPS;
            this.mechanicAS = this.digitizeForm.get('actualNoMechanic')?.value
            this.mechanicPS = this.digitizeForm.get('totalMechanicSuper')?.value
            this.result_mS = this.mechanicAS - this.mechanicPS;
            this.moneyAS = this.digitizeForm.get('actualNoMoney')?.value;
            this.moneyPS = this.digitizeForm.get('totalMoneySuper')?.value;
            this.result_myS = this.moneyAS - this.moneyPS;
            this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gS);
            this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mS);
            this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myS);
            this.buttonDisableSuper = false;
            this.buttonDisableSuperEdit = true;
            this.showMeSuper1A = true;
          });
        });
      };
    });
  };

  updateDieselA1() {
    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdDieselA1();
    this.getPreviuosNoGallonsDiesel1();
    this.getPreviuosNoGallonsMechanicDiesel1();
    this.getPreviuosNoGallonsMoneyDiesel1();
    this.getTotalNoGallonsDiesel();
    this.getTotalNoMechanicDiesel();
    this.getTotalNoMoneyDiesel();
    this.getTotalGallons();
    this.gallonageResultsDieselUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdDieselA1();
        this.getPreviuosNoGallonsDiesel1();
        this.getPreviuosNoGallonsMechanicDiesel1();
        this.getPreviuosNoGallonsMoneyDiesel1();
        this.getTotalNoGallonsDiesel();
        this.getTotalNoMechanicDiesel();
        this.getTotalNoMoneyDiesel();
        this.getTotalGallons();
        this.gallonageResultsDieselUpdte();
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.getGeneralAssignmentDispenserReaderId();
          this.getAssignmentHoseIdDieselA1();
          this.getPreviuosNoGallonsDiesel1();
          this.getPreviuosNoGallonsMechanicDiesel1();
          this.getPreviuosNoGallonsMoneyDiesel1();
          this.getTotalNoGallonsDiesel();
          this.getTotalNoMechanicDiesel();
          this.getTotalNoMoneyDiesel();
          this.getTotalGallons();
          this.gallonageResultsDieselUpdte();
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.gallonAD = this.digitizeForm.get('actualNoGallons')?.value;
          this.gallonPD = this.digitizeForm.get('totalGallonDiesel')?.value;
          this.result_gD = this.gallonAD - this.gallonPD;
          this.mechanicAD = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicPD = this.digitizeForm.get('totalMechanicDiesel')?.value
          this.result_mD = this.mechanicAD - this.mechanicPD;
          this.moneyAD = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyPD = this.digitizeForm.get('totalMoneyDiesel')?.value;
          this.result_myD = this.moneyAD - this.moneyPD;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gD);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mD);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myD);
          this.buttonDisableDiesel = false;
          this.buttonDisableDieselEdit = true;
          this.showMeDiesel1A = true;
          const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
          snackBarRef.afterDismissed().subscribe(() => {
            this.gallonAD = this.digitizeForm.get('actualNoGallons')?.value;
            this.gallonPD = this.digitizeForm.get('totalGallonDiesel')?.value;
            this.result_gD = this.gallonAD - this.gallonPD;
            this.mechanicAD = this.digitizeForm.get('actualNoMechanic')?.value
            this.mechanicPD = this.digitizeForm.get('totalMechanicDiesel')?.value
            this.result_mD = this.mechanicAD - this.mechanicPD;
            this.moneyAD = this.digitizeForm.get('actualNoMoney')?.value;
            this.moneyPD = this.digitizeForm.get('totalMoneyDiesel')?.value;
            this.result_myD = this.moneyAD - this.moneyPD;
            this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gD);
            this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mD);
            this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myD);
            this.buttonDisableDiesel = false;
            this.buttonDisableDieselEdit = true;
            this.showMeDiesel1A = true;

          });
        });
      };
    });
  };

  updateRegularB1() {
    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdRegularB1();
    this.getPreviuosNoGallons1();
    this.getPreviuosNoGallonsMechanicRegular1();
    this.getPreviuosNoGallonsMoneyRegular1();
    this.getTotalNoGallonsRegular();
    this.getTotalNoMechanicRegular();
    this.getTotalNoMoneyRegular();
    this.getTotalGallons();
    this.gallonageResultsRegularUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    console.log(this.digitizeForm.value);
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdRegularB1();
        this.getPreviuosNoGallons1();
        this.getPreviuosNoGallonsMechanicRegular1();
        this.getPreviuosNoGallonsMoneyRegular1();
        this.getTotalNoGallonsRegular();
        this.getTotalNoMechanicRegular();
        this.getTotalNoMoneyRegular();
        this.getTotalGallons();
        this.gallonageResultsRegularUpdte();
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        console.log(this.digitizeForm.value);
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.getGeneralAssignmentDispenserReaderId();
          this.getAssignmentHoseIdRegularB1();
          this.getPreviuosNoGallons1();
          this.getPreviuosNoGallonsMechanicRegular1();
          this.getPreviuosNoGallonsMoneyRegular1();
          this.getTotalNoGallonsRegular();
          this.getTotalNoMechanicRegular();
          this.getTotalNoMoneyRegular();
          this.getTotalGallons();
          this.gallonageResultsRegularUpdte();
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.gallonA = this.digitizeForm.get('actualNoGallons')?.value;
          this.gallonP = this.digitizeForm.get('totalNoGallons')?.value;
          this.result_g = this.gallonA - this.gallonP;
          this.mechanicA = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicP = this.digitizeForm.get('totalMechanicRegular')?.value
          this.result_m = this.mechanicA - this.mechanicP;
          this.moneyA = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyP = this.digitizeForm.get('totalMoneyRegular')?.value;
          this.result_my = this.moneyA - this.moneyP;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_g);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_m);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_my);
          console.log(this.digitizeForm.value);
          this.buttonDisableRegularB = false;
          this.buttonDisableRegular2Edit = true;
          this.showMeRegular1B = true;
          const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
          snackBarRef.afterDismissed().subscribe(() => {
            this.gallonA = this.digitizeForm.get('actualNoGallons')?.value;
            this.gallonP = this.digitizeForm.get('totalNoGallons')?.value;
            this.result_g = this.gallonA - this.gallonP;
            this.mechanicA = this.digitizeForm.get('actualNoMechanic')?.value
            this.mechanicP = this.digitizeForm.get('totalMechanicRegular')?.value
            this.result_m = this.mechanicA - this.mechanicP;
            this.moneyA = this.digitizeForm.get('actualNoMoney')?.value;
            this.moneyP = this.digitizeForm.get('totalMoneyRegular')?.value;
            this.result_my = this.moneyA - this.moneyP;
            this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_g);
            this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_m);
            this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_my);
            this.buttonDisableRegularB = false;
            this.buttonDisableRegular2Edit = true;
            this.showMeRegular1B = true;
            console.log(this.digitizeForm.value);
          });
        });
      };
    });
  };

  updateSuperB1() {
    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdSuperB1();
    this.getPreviuosNoGallonsSuper1();
    this.getPreviuosNoGallonsMechanicSuper1();
    this.getPreviuosNoGallonsMoneySuper1();
    this.getTotalNoGallonsSuper();
    this.getTotalNoMechanicSuper();
    this.getTotalNoMoneySuper();
    this.getTotalGallons();
    this.gallonageResultsSuperUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdSuperB1();
        this.getPreviuosNoGallonsSuper1();
        this.getPreviuosNoGallonsMechanicSuper1();
        this.getPreviuosNoGallonsMoneySuper1();
        this.getTotalNoGallonsSuper();
        this.getTotalNoMechanicSuper();
        this.getTotalNoMoneySuper();
        this.getTotalGallons();
        this.gallonageResultsSuperUpdte();
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        this.getFuelIdByHoseId();
        this.getAvailable();
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.getGeneralAssignmentDispenserReaderId();
          this.getAssignmentHoseIdSuperA1();
          this.getPreviuosNoGallonsSuper1();
          this.getPreviuosNoGallonsMechanicSuper1();
          this.getPreviuosNoGallonsMoneySuper1();
          this.getTotalNoGallonsSuper();
          this.getTotalNoMechanicSuper();
          this.getTotalNoMoneySuper();
          this.getTotalGallons();
          this.gallonageResultsSuperUpdte();
          this.gallonAS = this.digitizeForm.get('actualNoGallons')?.value;
          this.gallonPS = this.digitizeForm.get('totalGallonSuper')?.value;
          this.result_gS = this.gallonAS - this.gallonPS;
          this.mechanicAS = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicPS = this.digitizeForm.get('totalMechanicSuper')?.value
          this.result_mS = this.mechanicAS - this.mechanicPS;
          this.moneyAS = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyPS = this.digitizeForm.get('totalMoneySuper')?.value;
          this.result_myS = this.moneyAS - this.moneyPS;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gS);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mS);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myS);
          this.buttonDisableSuperB = false;
          this.buttonDisableSuper2Edit = true;
          this.showMeSuper1B = true;
          const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
          snackBarRef.afterDismissed().subscribe(() => {
            this.gallonAS = this.digitizeForm.get('actualNoGallons')?.value;
            this.gallonPS = this.digitizeForm.get('totalGallonSuper')?.value;
            this.result_gS = this.gallonAS - this.gallonPS;
            this.mechanicAS = this.digitizeForm.get('actualNoMechanic')?.value
            this.mechanicPS = this.digitizeForm.get('totalMechanicSuper')?.value
            this.result_mS = this.mechanicAS - this.mechanicPS;
            this.moneyAS = this.digitizeForm.get('actualNoMoney')?.value;
            this.moneyPS = this.digitizeForm.get('totalMoneySuper')?.value;
            this.result_myS = this.moneyAS - this.moneyPS;
            this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gS);
            this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mS);
            this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myS);
            this.buttonDisableSuperB = false;
            this.buttonDisableSuper2Edit = true;
            this.showMeSuper1B = true;
          });
        });
      };
    });
  };



  updateDieselB1() {
    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdDieselB1();
    this.getPreviuosNoGallonsDiesel1();
    this.getPreviuosNoGallonsMechanicDiesel1();
    this.getPreviuosNoGallonsMoneyDiesel1();
    this.getTotalNoGallonsDiesel();
    this.getTotalNoMechanicDiesel();
    this.getTotalNoMoneyDiesel();
    this.getTotalGallons();
    this.gallonageResultsDieselUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getGeneralAssignmentDispenserReaderId();
      this.getAssignmentHoseIdDieselB1();
      this.getPreviuosNoGallonsDiesel1();
      this.getPreviuosNoGallonsMechanicDiesel1();
      this.getPreviuosNoGallonsMoneyDiesel1();
      this.getTotalNoGallonsDiesel();
      this.getTotalNoMechanicDiesel();
      this.getTotalNoMoneyDiesel();
      this.getTotalGallons();
      this.gallonageResultsDieselUpdte();
      this.getHoseIdByAssignmentHoseId();
      this.getFuelIdByHoseId();
      const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
      snackBarRef.afterDismissed().subscribe(() => {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdDieselB1();
        this.getPreviuosNoGallonsDiesel1();
        this.getPreviuosNoGallonsMechanicDiesel1();
        this.getPreviuosNoGallonsMoneyDiesel1();
        this.getTotalNoGallonsDiesel();
        this.getTotalNoMechanicDiesel();
        this.getTotalNoMoneyDiesel();
        this.getTotalGallons();
        this.gallonageResultsDieselUpdte();
        this.getFuelIdByHoseId();
        this.getAvailable();
        this.gallonAD = this.digitizeForm.get('actualNoGallons')?.value;
        this.gallonPD = this.digitizeForm.get('totalGallonDiesel')?.value;
        this.result_gD = this.gallonAD - this.gallonPD;
        this.mechanicAD = this.digitizeForm.get('actualNoMechanic')?.value
        this.mechanicPD = this.digitizeForm.get('totalMechanicDiesel')?.value
        this.result_mD = this.mechanicAD - this.mechanicPD;
        this.moneyAD = this.digitizeForm.get('actualNoMoney')?.value;
        this.moneyPD = this.digitizeForm.get('totalMoneyDiesel')?.value;
        this.result_myD = this.moneyAD - this.moneyPD;
        this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gD);
        this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mD);
        this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myD);
        this.buttonDisableDieselB = false;
        this.buttonDisableDiesel2Edit = true;
        this.showMeDiesel1B = true;
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.gallonAD = this.digitizeForm.get('actualNoGallons')?.value;
          this.gallonPD = this.digitizeForm.get('totalGallonDiesel')?.value;
          this.result_gD = this.gallonAD - this.gallonPD;
          this.mechanicAD = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicPD = this.digitizeForm.get('totalMechanicDiesel')?.value
          this.result_mD = this.mechanicAD - this.mechanicPD;
          this.moneyAD = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyPD = this.digitizeForm.get('totalMoneyDiesel')?.value;
          this.result_myD = this.moneyAD - this.moneyPD;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gD);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mD);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myD);
          this.buttonDisableDieselB = false;
          this.buttonDisableDiesel2Edit = true;
          this.showMeDiesel1B = true;
        });
      });
    });
  };

  updateRegularA2() {
    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdRegularA2();
    this.getPreviuosNoGallons1();
    this.getPreviuosNoGallonsMechanicRegular1();
    this.getPreviuosNoGallonsMoneyRegular1();
    this.getTotalNoGallonsRegular();
    this.getTotalNoMechanicRegular();
    this.getTotalNoMoneyRegular();
    this.getTotalGallons();
    this.gallonageResultsRegularUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getGeneralAssignmentDispenserReaderId();
      this.getAssignmentHoseIdRegularA2();
      this.getPreviuosNoGallons1();
      this.getPreviuosNoGallonsMechanicRegular1();
      this.getPreviuosNoGallonsMoneyRegular1();
      this.getTotalNoGallonsRegular();
      this.getTotalNoMechanicRegular();
      this.getTotalNoMoneyRegular();
      this.getTotalGallons();
      this.gallonageResultsRegularUpdte();
      this.getHoseIdByAssignmentHoseId();
      this.getFuelIdByHoseId();
      const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
      snackBarRef.afterDismissed().subscribe(() => {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdRegularA2();
        this.getPreviuosNoGallons1();
        this.getPreviuosNoGallonsMechanicRegular1();
        this.getPreviuosNoGallonsMoneyRegular1();
        this.getTotalNoGallonsRegular();
        this.getTotalNoMechanicRegular();
        this.getTotalNoMoneyRegular();
        this.getTotalGallons();
        this.gallonageResultsRegularUpdte();
        this.getFuelIdByHoseId();
        this.getAvailable();
        this.gallonA = this.digitizeForm.get('actualNoGallons')?.value;
        this.gallonP = this.digitizeForm.get('totalNoGallons')?.value;
        this.result_g = this.gallonA - this.gallonP;
        this.mechanicA = this.digitizeForm.get('actualNoMechanic')?.value
        this.mechanicP = this.digitizeForm.get('totalMechanicRegular')?.value
        this.result_m = this.mechanicA - this.mechanicP;
        this.moneyA = this.digitizeForm.get('actualNoMoney')?.value;
        this.moneyP = this.digitizeForm.get('totalMoneyRegular')?.value;
        this.result_my = this.moneyA - this.moneyP;
        this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_g);
        this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_m);
        this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_my);
        this.buttonDisableRegularA2 = false;
        this.buttonDisableRegular3Edit = true;
        this.showMeRegular2A = true;
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.gallonA = this.digitizeForm.get('actualNoGallons')?.value;
          this.gallonP = this.digitizeForm.get('totalNoGallons')?.value;
          this.result_g = this.gallonA - this.gallonP;
          this.mechanicA = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicP = this.digitizeForm.get('totalMechanicRegular')?.value
          this.result_m = this.mechanicA - this.mechanicP;
          this.moneyA = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyP = this.digitizeForm.get('totalMoneyRegular')?.value;
          this.result_my = this.moneyA - this.moneyP;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_g);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_m);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_my);
          this.buttonDisableRegularA2 = false;
          this.buttonDisableRegular3Edit = true;
          this.showMeRegular2A = true;
        });
      });
    });
  };

  updateSuperA2() {
    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdSuperA2();
    this.getPreviuosNoGallonsSuper1();
    this.getPreviuosNoGallonsMechanicSuper1();
    this.getPreviuosNoGallonsMoneySuper1();
    this.getTotalNoGallonsSuper();
    this.getTotalNoMechanicSuper();
    this.getTotalNoMoneySuper();
    this.getTotalGallons();
    this.gallonageResultsSuperUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getGeneralAssignmentDispenserReaderId();
      this.getAssignmentHoseIdSuperA2();
      this.getPreviuosNoGallonsSuper1();
      this.getPreviuosNoGallonsMechanicSuper1();
      this.getPreviuosNoGallonsMoneySuper1();
      this.getTotalNoGallonsSuper();
      this.getTotalNoMechanicSuper();
      this.getTotalNoMoneySuper();
      this.getTotalGallons();
      this.gallonageResultsSuperUpdte();
      this.getHoseIdByAssignmentHoseId();
      this.getFuelIdByHoseId();
      const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
      snackBarRef.afterDismissed().subscribe(() => {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdSuperA2();
        this.getPreviuosNoGallonsSuper1();
        this.getPreviuosNoGallonsMechanicSuper1();
        this.getPreviuosNoGallonsMoneySuper1();
        this.getTotalNoGallonsSuper();
        this.getTotalNoMechanicSuper();
        this.getTotalNoMoneySuper();
        this.getTotalGallons();
        this.gallonageResultsSuperUpdte();
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        this.getAvailable();
        this.gallonAS = this.digitizeForm.get('actualNoGallons')?.value;
        this.gallonPS = this.digitizeForm.get('totalGallonSuper')?.value;
        this.result_gS = this.gallonAS - this.gallonPS;
        this.mechanicAS = this.digitizeForm.get('actualNoMechanic')?.value
        this.mechanicPS = this.digitizeForm.get('totalMechanicSuper')?.value
        this.result_mS = this.mechanicAS - this.mechanicPS;
        this.moneyAS = this.digitizeForm.get('actualNoMoney')?.value;
        this.moneyPS = this.digitizeForm.get('totalMoneySuper')?.value;
        this.result_myS = this.moneyAS - this.moneyPS;
        this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gS);
        this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mS);
        this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myS);
        this.buttonDisableSuperA2 = false;
        this.buttonDisableSuper3Edit = true;
        this.showMeSuper2A = true;
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.gallonAS = this.digitizeForm.get('actualNoGallons')?.value;
          this.gallonPS = this.digitizeForm.get('totalGallonSuper')?.value;
          this.result_gS = this.gallonAS - this.gallonPS;
          this.mechanicAS = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicPS = this.digitizeForm.get('totalMechanicSuper')?.value
          this.result_mS = this.mechanicAS - this.mechanicPS;
          this.moneyAS = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyPS = this.digitizeForm.get('totalMoneySuper')?.value;
          this.result_myS = this.moneyAS - this.moneyPS;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gS);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mS);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myS);
          this.buttonDisableSuperA2 = false;
          this.buttonDisableSuper3Edit = true;
          this.showMeSuper2A = true;
        });
      });
    });
  };

  updateDieselA2() {
    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdDieselA2();
    this.getPreviuosNoGallonsDiesel1();
    this.getPreviuosNoGallonsMechanicDiesel1();
    this.getPreviuosNoGallonsMoneyDiesel1();
    this.getTotalNoGallonsDiesel();
    this.getTotalNoMechanicDiesel();
    this.getTotalNoMoneyDiesel();
    this.getTotalGallons();
    this.gallonageResultsDieselUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdDieselA2();
        this.getPreviuosNoGallonsDiesel1();
        this.getPreviuosNoGallonsMechanicDiesel1();
        this.getPreviuosNoGallonsMoneyDiesel1();
        this.getTotalNoGallonsDiesel();
        this.getTotalNoMechanicDiesel();
        this.getTotalNoMoneyDiesel();
        this.getTotalGallons();
        this.gallonageResultsDieselUpdte();
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.getGeneralAssignmentDispenserReaderId();
          this.getAssignmentHoseIdDieselA2();
          this.getPreviuosNoGallonsDiesel1();
          this.getPreviuosNoGallonsMechanicDiesel1();
          this.getPreviuosNoGallonsMoneyDiesel1();
          this.getTotalNoGallonsDiesel();
          this.getTotalNoMechanicDiesel();
          this.getTotalNoMoneyDiesel();
          this.getTotalGallons();
          this.gallonageResultsDieselUpdte();
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.gallonAD = this.digitizeForm.get('actualNoGallons')?.value;
          this.gallonPD = this.digitizeForm.get('totalGallonDiesel')?.value;
          this.result_gD = this.gallonAD - this.gallonPD;
          this.mechanicAD = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicPD = this.digitizeForm.get('totalMechanicDiesel')?.value
          this.result_mD = this.mechanicAD - this.mechanicPD;
          this.moneyAD = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyPD = this.digitizeForm.get('totalMoneyDiesel')?.value;
          this.result_myD = this.moneyAD - this.moneyPD;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gD);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mD);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myD);
          this.buttonDisableDieselA2 = false;
          this.buttonDisableDiesel3Edit = true;
          this.showMeDiesel2A = true;
          const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
          snackBarRef.afterDismissed().subscribe(() => {
            this.gallonAD = this.digitizeForm.get('actualNoGallons')?.value;
            this.gallonPD = this.digitizeForm.get('totalGallonDiesel')?.value;
            this.result_gD = this.gallonAD - this.gallonPD;
            this.mechanicAD = this.digitizeForm.get('actualNoMechanic')?.value
            this.mechanicPD = this.digitizeForm.get('totalMechanicDiesel')?.value
            this.result_mD = this.mechanicAD - this.mechanicPD;
            this.moneyAD = this.digitizeForm.get('actualNoMoney')?.value;
            this.moneyPD = this.digitizeForm.get('totalMoneyDiesel')?.value;
            this.result_myD = this.moneyAD - this.moneyPD;
            this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gD);
            this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mD);
            this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myD);
            this.buttonDisableDieselA2 = false;
            this.buttonDisableDiesel3Edit = true;
            this.showMeDiesel2A = true;
          });
        });
      };
    });
  };

  updateDieselB2() {
    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdDieselB2();
    this.getPreviuosNoGallonsDiesel1();
    this.getPreviuosNoGallonsMechanicDiesel1();
    this.getPreviuosNoGallonsMoneyDiesel1();
    this.getTotalNoGallonsDiesel();
    this.getTotalNoMechanicDiesel();
    this.getTotalNoMoneyDiesel();
    this.getTotalGallons();
    this.gallonageResultsDieselUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getGeneralAssignmentDispenserReaderId();
      this.getAssignmentHoseIdDieselB2();
      this.getPreviuosNoGallonsDiesel1();
      this.getPreviuosNoGallonsMechanicDiesel1();
      this.getPreviuosNoGallonsMoneyDiesel1();
      this.getTotalNoGallonsDiesel();
      this.getTotalNoMechanicDiesel();
      this.getTotalNoMoneyDiesel();
      this.getTotalGallons();
      this.gallonageResultsDieselUpdte();
      this.getHoseIdByAssignmentHoseId();
      this.getFuelIdByHoseId();
      const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
      snackBarRef.afterDismissed().subscribe(() => {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdDieselB2();
        this.getPreviuosNoGallonsDiesel1();
        this.getPreviuosNoGallonsMechanicDiesel1();
        this.getPreviuosNoGallonsMoneyDiesel1();
        this.getTotalNoGallonsDiesel();
        this.getTotalNoMechanicDiesel();
        this.getTotalNoMoneyDiesel();
        this.getTotalGallons();
        this.gallonageResultsDieselUpdte();
        this.getFuelIdByHoseId();
        this.getAvailable();
        this.gallonAD = this.digitizeForm.get('actualNoGallons')?.value;
        this.gallonPD = this.digitizeForm.get('totalGallonDiesel')?.value;
        this.result_gD = this.gallonAD - this.gallonPD;
        this.mechanicAD = this.digitizeForm.get('actualNoMechanic')?.value
        this.mechanicPD = this.digitizeForm.get('totalMechanicDiesel')?.value
        this.result_mD = this.mechanicAD - this.mechanicPD;
        this.moneyAD = this.digitizeForm.get('actualNoMoney')?.value;
        this.moneyPD = this.digitizeForm.get('totalMoneyDiesel')?.value;
        this.result_myD = this.moneyAD - this.moneyPD;
        this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gD);
        this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mD);
        this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myD);
        this.buttonDisableDieselB2 = false;
        this.buttonDisableDiesel4Edit = true;
        this.showMeDiesel2B = true;
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.gallonPD = this.digitizeForm.get('totalGallonDiesel')?.value;
          this.result_gD = this.gallonAD - this.gallonPD;
          this.mechanicAD = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicPD = this.digitizeForm.get('totalMechanicDiesel')?.value
          this.result_mD = this.mechanicAD - this.mechanicPD;
          this.moneyAD = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyPD = this.digitizeForm.get('totalMoneyDiesel')?.value;
          this.result_myD = this.moneyAD - this.moneyPD;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gD);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mD);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myD);
          this.buttonDisableDieselB2 = false;
          this.buttonDisableDiesel4Edit = true;
          this.showMeDiesel2B = true;
        });
      });
    });
  };


  updateRegularB2() {
    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdRegularB2();
    this.getPreviuosNoGallons1();
    this.getPreviuosNoGallonsMechanicRegular1();
    this.getPreviuosNoGallonsMoneyRegular1();
    this.getTotalNoGallonsRegular();
    this.getTotalNoMechanicRegular();
    this.getTotalNoMoneyRegular();
    this.getTotalGallons();
    this.gallonageResultsRegularUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getGeneralAssignmentDispenserReaderId();
      this.getAssignmentHoseIdRegularB2();
      this.getPreviuosNoGallons1();
      this.getPreviuosNoGallonsMechanicRegular1();
      this.getPreviuosNoGallonsMoneyRegular1();
      this.getTotalNoGallonsRegular();
      this.getTotalNoMechanicRegular();
      this.getTotalNoMoneyRegular();
      this.getTotalGallons();
      this.gallonageResultsRegularUpdte();
      this.getHoseIdByAssignmentHoseId();
      this.getFuelIdByHoseId();
      const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
      snackBarRef.afterDismissed().subscribe(() => {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdRegularB2();
        this.getPreviuosNoGallons1();
        this.getPreviuosNoGallonsMechanicRegular1();
        this.getPreviuosNoGallonsMoneyRegular1();
        this.getTotalNoGallonsRegular();
        this.getTotalNoMechanicRegular();
        this.getTotalNoMoneyRegular();
        this.getTotalGallons();
        this.gallonageResultsRegularUpdte();
        this.getFuelIdByHoseId();
        this.getAvailable();
        this.gallonA = this.digitizeForm.get('actualNoGallons')?.value;
        this.gallonP = this.digitizeForm.get('totalNoGallons')?.value;
        this.result_g = this.gallonA - this.gallonP;
        this.mechanicA = this.digitizeForm.get('actualNoMechanic')?.value
        this.mechanicP = this.digitizeForm.get('totalMechanicRegular')?.value
        this.result_m = this.mechanicA - this.mechanicP;
        this.moneyA = this.digitizeForm.get('actualNoMoney')?.value;
        this.moneyP = this.digitizeForm.get('totalMoneyRegular')?.value;
        this.result_my = this.moneyA - this.moneyP;
        this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_g);
        this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_m);
        this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_my);
        this.buttonDisableRegularB2 = false;
        this.buttonDisableRegular4Edit = true;
        this.showMeRegular2B = true;
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.gallonA = this.digitizeForm.get('actualNoGallons')?.value;
          this.gallonP = this.digitizeForm.get('totalNoGallons')?.value;
          this.result_g = this.gallonA - this.gallonP;
          this.mechanicA = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicP = this.digitizeForm.get('totalMechanicRegular')?.value
          this.result_m = this.mechanicA - this.mechanicP;
          this.moneyA = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyP = this.digitizeForm.get('totalMoneyRegular')?.value;
          this.result_my = this.moneyA - this.moneyP;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_g);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_m);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_my);
          this.buttonDisableRegularB2 = false;
          this.buttonDisableRegular4Edit = true;
          this.showMeRegular2B = true;
        });
      });
    });
  };

  updateSuperB2() {
    this.getGeneralAssignmentDispenserReaderId();
    this.getAssignmentHoseIdSuperB2();
    this.getPreviuosNoGallonsSuper1();
    this.getPreviuosNoGallonsMechanicSuper1();
    this.getPreviuosNoGallonsMoneySuper1();
    this.getTotalNoGallonsSuper();
    this.getTotalNoMechanicSuper();
    this.getTotalNoMoneySuper();
    this.getTotalGallons();
    this.gallonageResultsSuperUpdte();
    this.getHoseIdByAssignmentHoseId();
    this.getFuelIdByHoseId();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getGeneralAssignmentDispenserReaderId();
        this.getAssignmentHoseIdSuperB2();
        this.getPreviuosNoGallonsSuper1();
        this.getPreviuosNoGallonsMechanicSuper1();
        this.getPreviuosNoGallonsMoneySuper1();
        this.getTotalNoGallonsSuper();
        this.getTotalNoMechanicSuper();
        this.getTotalNoMoneySuper();
        this.getTotalGallons();
        this.gallonageResultsSuperUpdte();
        this.getHoseIdByAssignmentHoseId();
        this.getFuelIdByHoseId();
        const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.getGeneralAssignmentDispenserReaderId();
          this.getAssignmentHoseIdSuperB2();
          this.getPreviuosNoGallonsSuper1();
          this.getPreviuosNoGallonsMechanicSuper1();
          this.getPreviuosNoGallonsMoneySuper1();
          this.getTotalNoGallonsSuper();
          this.getTotalNoMechanicSuper();
          this.getTotalNoMoneySuper();
          this.getTotalGallons();
          this.gallonageResultsSuperUpdte();
          this.getHoseIdByAssignmentHoseId();
          this.getFuelIdByHoseId();
          this.getAvailable();
          this.gallonAS = this.digitizeForm.get('actualNoGallons')?.value;
          this.gallonPS = this.digitizeForm.get('totalGallonSuper')?.value;
          this.result_gS = this.gallonAS - this.gallonPS;
          this.mechanicAS = this.digitizeForm.get('actualNoMechanic')?.value
          this.mechanicPS = this.digitizeForm.get('totalMechanicSuper')?.value
          this.result_mS = this.mechanicAS - this.mechanicPS;
          this.moneyAS = this.digitizeForm.get('actualNoMoney')?.value;
          this.moneyPS = this.digitizeForm.get('totalMoneySuper')?.value;
          this.result_myS = this.moneyAS - this.moneyPS;
          this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gS);
          this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mS);
          this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myS);
          this.buttonDisableSuperB2 = false;
          this.buttonDisableSuper4Edit = true;
          this.showMeSuper2B = true;
          const snackBarRef = this._snackBar.openFromComponent(TimerComponent, { duration: 300 });
          snackBarRef.afterDismissed().subscribe(() => {
            this.gallonAS = this.digitizeForm.get('actualNoGallons')?.value;
            this.gallonPS = this.digitizeForm.get('totalGallonSuper')?.value;
            this.result_gS = this.gallonAS - this.gallonPS;
            this.mechanicAS = this.digitizeForm.get('actualNoMechanic')?.value
            this.mechanicPS = this.digitizeForm.get('totalMechanicSuper')?.value
            this.result_mS = this.mechanicAS - this.mechanicPS;
            this.moneyAS = this.digitizeForm.get('actualNoMoney')?.value;
            this.moneyPS = this.digitizeForm.get('totalMoneySuper')?.value;
            this.result_myS = this.moneyAS - this.moneyPS;
            this.digitizeForm.controls['previuosNoGallons'].setValue(this.result_gS);
            this.digitizeForm.controls['previuosNoMechanic'].setValue(this.result_mS);
            this.digitizeForm.controls['previuosNoMoney'].setValue(this.result_myS);
            this.buttonDisableSuperB2 = false;
            this.buttonDisableSuper4Edit = true;
            this.showMeSuper2B = true;
          });
        });
      };
    });
  };


  saveUpdateDispenserReader() {
   
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getAssignmentHoseIdRegularA1();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getAssignmentHoseIdRegularA1();
      this.gallonageResults();
      this.calculateTotalGeneralGallons();
      this.updateDispenserReader();
      this.updaTotalGallons();
      this.updateGallons();
      this.resetFormValuesNumbering();
      this.showMeRegular1A = !this.showMeRegular1A;
    });
  };

  saveUpdateDispenserReader2() {
   
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getAssignmentHoseIdRegularB1();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getAssignmentHoseIdRegularB1();
      this.gallonageResults();
      this.calculateTotalGeneralGallons();
      this.updateDispenserReader2();
      this.updaTotalGallons();
      this.updateGallons();
      this.resetFormValuesNumbering();
      this.showMeRegular1B = !this.showMeRegular1B;
    });
  };

  saveUpdateDispenserReader3() {
    
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getAssignmentHoseIdRegularA2();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getAssignmentHoseIdRegularA2();
      this.gallonageResults();
      this.calculateTotalGeneralGallons();
      this.updateDispenserReader3();
      this.updaTotalGallons();
      this.updateGallons();
      this.resetFormValuesNumbering();
      this.showMeRegular2A = !this.showMeRegular2A
    });
  };

  saveUpdateDispenserReader4() {
    
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getAssignmentHoseIdRegularB2();
      this.updateDispenserReader4();
      this.updaTotalGallons();
      this.updateGallons();
      this.resetFormValuesNumbering();
      this.showMeRegular2B = !this.showMeRegular2B;
    });
   
  };

  saveUpdateDispenserReaderSuper() {
    this.gallonageResults();
    //this.gallonageResultsSuperUpdte();
    this.calculateTotalGeneralGallonsSuper();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getAssignmentHoseIdSuperA1()
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getAssignmentHoseIdSuperA1();
      this.gallonageResults();
      this.calculateTotalGeneralGallonsSuper();
      this.updateDispenserReaderSuper();
      this.updaTotalGallons();
      this.updateGallons();
      this.resetFormValuesNumbering();
      this.showMeSuper1A = !this.showMeSuper1A;
    });
  };


  saveUpdateDispenserReaderSuper2() {
    this.gallonageResults();
    this.calculateTotalGeneralGallonsSuper();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getAssignmentHoseIdSuperB1()
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getAssignmentHoseIdSuperB1();
      this.gallonageResults();
      this.calculateTotalGeneralGallonsSuper();
      this.updateDispenserReaderSuper2();
      this.updaTotalGallons();
      this.updateGallons();
      this.resetFormValuesNumbering();
      this.showMeSuper1B = !this.showMeSuper1B;
    });
  };


  saveUpdateDispenserReaderSuper3() {
   this.gallonageResults();
    this.calculateTotalGeneralGallonsSuper();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getAssignmentHoseIdSuperA2();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getAssignmentHoseIdSuperA2();
      this.gallonageResults();
      this.calculateTotalGeneralGallonsSuper();
      this.updateDispenserReaderSuper3();
      this.updaTotalGallons();
      this.updateGallons();
      this.resetFormValuesNumbering();
      this.showMeSuper2A = !this.showMeSuper2A
    });
  };

  saveUpdateDispenserReaderSuper4() {
    this.gallonageResults();
    this.calculateTotalGeneralGallonsSuper();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getAssignmentHoseIdSuperB2();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAssignmentHoseIdSuperB2();
      this.gallonageResults();
      this.calculateTotalGeneralGallonsSuper();
      this.updateDispenserSuper4();
      this.updaTotalGallons();
      this.updateGallons();
      this.resetFormValuesNumbering();
      this.showMeSuper2B = !this.showMeSuper2B;
    });
  };

  saveUpdateDispenserReaderDiesel() {
    this.gallonageResults();
    this.calculateTotalGeneralGallonsDiesel();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getAssignmentHoseIdDieselA1();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getAssignmentHoseIdDieselA1();
        this.gallonageResults();
        this.calculateTotalGeneralGallonsDiesel();
        this.updateDispenerReaderDiesel();
        this.updaTotalGallons();
        this.updateGallons();
        this.resetFormValuesNumbering();
        this.showMeDiesel1A = !this.showMeDiesel1A
      };
    });
  };

  saveUpdateDispenserReaderDiesel2() {
    this.gallonageResults();
    this.calculateTotalGeneralGallonsDiesel();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getAssignmentHoseIdDieselB1();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.getAssignmentHoseIdDieselB1();
        this.gallonageResults();
        this.calculateTotalGeneralGallonsDiesel();
        this.updateDispenerReaderDiesel2();
        this.updaTotalGallons();
        this.updateGallons();
        this.resetFormValuesNumbering();
        this.showMeDiesel1B = !this.showMeDiesel1B
      };
    });
  };

  saveUpdateDispenserReaderDiesel3() {
    this.gallonageResults();
    this.calculateTotalGeneralGallonsDiesel();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getAssignmentHoseIdDieselA2();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getAssignmentHoseIdDieselA2();
      this.gallonageResults();
      this.calculateTotalGeneralGallonsDiesel();
      this.updateDispenerReaderDiesel3();
      this.updaTotalGallons();
      this.updateGallons();
      this.resetFormValuesNumbering();
      this.showMeDiesel2A = !this.showMeDiesel2A
    });
  };

  saveUpdateDispenserReaderDiesel4() {
    this.gallonageResults();
    this.calculateTotalGeneralGallonsDiesel();
    this.gallonAD = this.digitizeForm.get('available')?.value;
    this.gallonA = this.digitizeForm.get('totalNoGallons')?.value;
    if (this.gallonAD < this.gallonA) {
      Swal.fire({
        title: "Alerta!",
        text: "Combustible Insuficiente",
      })
      return;
    }
    this.getAssignmentHoseIdDieselB2();
    const dialogRef = this.dialog.open(ConfirmationsComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(resp => {
      this.getAssignmentHoseIdDieselB2();
      this.gallonageResults();
      this.calculateTotalGeneralGallonsDiesel();
      this.updateDispenserReaderDiesel4();
      this.updaTotalGallons();
      this.updateGallons();
      this.resetFormValuesNumbering();
      this.showMeDiesel2B = !this.showMeDiesel2B;
    });
  };


  //it comes frome API
  updateDispenserReader() {
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    this.getAssignmentHoseIdRegularA1();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  updateDispenserReader2() {
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    this.getAssignmentHoseIdRegularB1();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  updateDispenserReader3() {
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    this.getAssignmentHoseIdRegularA2();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  updateDispenserReader4() {
    this.gallonageResults();
    this.calculateTotalGeneralGallons();
    this.getAssignmentHoseIdRegularB2();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  updateDispenserReaderSuper() {
    this.getAssignmentHoseIdSuperA1();
    this.gallonageResults();
    this.calculateTotalGeneralGallonsSuper();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  updateDispenserReaderSuper2() {
    this.getAssignmentHoseIdSuperB1();
    this.gallonageResults();
    this.calculateTotalGeneralGallonsSuper();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  updateDispenserReaderSuper3() {
    this.getAssignmentHoseIdSuperA2();
    this.gallonageResults();
    this.calculateTotalGeneralGallonsSuper();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  updateDispenserSuper4() {
    this.getAssignmentHoseIdSuperB2();
    this.gallonageResults();
    this.calculateTotalGeneralGallonsSuper();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };


  updateDispenerReaderDiesel() {
    this.getAssignmentHoseIdDieselA1();
    this.gallonageResultsDieselUpdte();
    this.calculateTotalGeneralGallonsDiesel();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  updateDispenerReaderDiesel2() {
    this.getAssignmentHoseIdDieselB1();
    this.gallonageResultsDieselUpdte();
    this.calculateTotalGeneralGallonsDiesel();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  updateDispenerReaderDiesel3() {
    this.getAssignmentHoseIdDieselA2();
    this.gallonageResultsDieselUpdte();
    this.calculateTotalGeneralGallonsDiesel();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  updateDispenserReaderDiesel4() {
    this.getAssignmentHoseIdDieselB2();
    this.gallonageResultsDieselUpdte();
    this.calculateTotalGeneralGallonsDiesel();
    this.dispenserService.updateDispenserReader
      (this.digitizeForm.value).subscribe(resp => {
        Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  };

  calculateTotalGeneralGallons() {

    this.calculate_gallonA = this.digitizeForm.get('actualNoGallons')?.value;
    this.calculate_gallonP = this.digitizeForm.get('previuosNoGallons')?.value;
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

  };

  calculateTotalGeneralGallonsSuper() {

    this.calculate_gallonAS = this.digitizeForm.get('actualNoGallons')?.value;
    this.calculate_gallonPS = this.digitizeForm.get('previuosNoGallons')?.value;
    this.calculate_result_gS = this.calculate_gallonAS - this.calculate_gallonPS;
    this.digitizeForm.controls['totalGallonSuper'].setValue(this.calculate_result_gS);

    this.calculate_mechanicAS = this.digitizeForm.get('actualNoMechanic')?.value;
    this.calculate_mechanicPS = this.digitizeForm.get('previuosNoMechanic')?.value;
    this.calculate_result_mS = this.calculate_mechanicAS - this.calculate_mechanicPS;
    this.digitizeForm.controls['totalMechanicSuper'].setValue(this.calculate_result_mS);

    this.calculate_moneyAS = this.digitizeForm.get('actualNoMoney')?.value;
    this.calculate_moneyPS = this.digitizeForm.get('previuosNoMoney')?.value;
    this.calculate_result_myS = this.calculate_moneyAS - this.calculate_moneyPS;
    this.digitizeForm.controls['totalMoneySuper'].setValue(this.calculate_result_myS);

  };

  calculateTotalGeneralGallonsDiesel() {

    this.calculate_gallonAD = this.digitizeForm.get('actualNoGallons')?.value;
    this.calculate_gallonPD = this.digitizeForm.get('previuosNoGallons')?.value;
    this.calculate_result_gD = this.calculate_gallonAD - this.calculate_gallonPD;
    this.digitizeForm.controls['totalGallonDiesel'].setValue(this.calculate_result_gD);

    this.calculate_mechanicAD = this.digitizeForm.get('actualNoMechanic')?.value;
    this.calculate_mechanicPD = this.digitizeForm.get('previuosNoMechanic')?.value;
    this.calculate_result_mD = this.calculate_mechanicAD - this.calculate_mechanicPD;
    this.digitizeForm.controls['totalMechanicDiesel'].setValue(this.calculate_result_mD);

    this.calculate_moneyAD = this.digitizeForm.get('actualNoMoney')?.value;
    this.calculate_moneyPD = this.digitizeForm.get('previuosNoMoney')?.value;
    this.calculate_result_myD = this.calculate_moneyAD - this.calculate_moneyPD;
    this.digitizeForm.controls['totalMoneyDiesel'].setValue(this.calculate_result_myD);

  };

  updaTotalGallons() {
    const data = {
      ...this.digitizeForm.value,
    };
    this.dispenserService.updateTotalGallons(data)
      .subscribe(resp => {
      });
  };

  closeDay() { }
};

