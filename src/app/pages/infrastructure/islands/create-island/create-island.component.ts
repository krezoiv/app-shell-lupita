import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';
import { StatusService } from 'src/app/services/functions/status.service';
import Swal from 'sweetalert2';
import { Status } from '../../../../models/status.model';

@Component({
  selector: 'app-create-island',
  templateUrl: './create-island.component.html',
  styleUrls: ['./create-island.component.css']
})
export class CreateIslandComponent implements OnInit {
  selectedStatus: Status[] = [];

  islandForm: FormGroup = this.fb.group({
    islandNumber: ['', Validators.required],
    statusId: ['', Validators.required],

  })

  constructor(

    private fb: FormBuilder,
    private router : Router,
    private statusService: StatusService,
    private islandService : IslandsService
  ) { }

  ngOnInit(): void {
    this.getStatus();
  }


  getStatus() {
    this.statusService.getStatus()
      .subscribe(({ status }) => {
        this.selectedStatus = status
      });
  };

  createIsland(){
  
    this.islandService.createIsland(this.islandForm.value)
    .subscribe( data => {
      Swal.fire('Exitoso', 'creado correctamente');
      this.islandForm.reset();
      this.router.navigateByUrl('/dashboard/infrastructure/fuels/listFuels');
    }, err => {
      Swal.fire('Error', err.error.msg, 'error')
    });
  
  };

};
