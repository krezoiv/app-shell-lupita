
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Island } from 'src/app/models/fuelstation/island.models'
import { Status } from 'src/app/models/status.model';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';
import { StatusService } from 'src/app/services/functions/status.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-island',
  templateUrl: './update-island.component.html',
  styleUrls: ['./update-island.component.css']
})

/**
 * ! class that is use to uptade island
 */
export class UpdateIslandComponent implements OnInit {

  updateIslandForm!: FormGroup;
  selectedStatus: Status[] = [];
  public island: Island[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private islandService: IslandsService,
    private statusService : StatusService,

    @Inject(MAT_DIALOG_DATA) public islands: Island,
    private dialogRef: MatDialogRef<UpdateIslandComponent>

  ) { }

  ngOnInit(): void {

    this.updateIslandForm = this.fb.group({
      islandNumber: ['', Validators.required],
      statusId :  ['', Validators.required],

    })

    if (this.islands) {
      this.updateIslandForm.controls['islandNumber'].setValue(this.islands.islandNumber);
    }

    this.getStatus();
  }

  getStatus(){
    this.statusService.getStatus()
        .subscribe(({status}) => {
          this.selectedStatus = status
        })
  }

  updateIsland() {
    const data = {
      ...this.updateIslandForm.value,
      islandId: this.islands.islandId
    }
   
   

    this.islandService.updateIsland
      (data).subscribe(resp => {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/dashboard/infrastructure/island/listIsland']));
        this.updateIslandForm.reset();
        Swal.fire('Actualizado', `Actualizado Correctamente`, 'success');
        this.dialogRef.close('actualizado');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })

      
  }





}