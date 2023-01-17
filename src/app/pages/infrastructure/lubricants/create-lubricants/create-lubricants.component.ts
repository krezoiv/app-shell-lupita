import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from 'src/app/models/status.model';
import { LubricantsInventoryService } from 'src/app/services/lubricants/lubricants-inventory.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-lubricants',
  templateUrl: './create-lubricants.component.html',
  styleUrls: ['./create-lubricants.component.css']
})
export class CreateLubricantsComponent implements OnInit {

  public formSubmitted = false;
  selectedStatus : Status[] = [];

  newLubricantForm : FormGroup = this.fb.group({
    lubricantName: ['', Validators.required],
    lubricantCostPrice: ['', Validators.required],
    lubricantSalePrice: ['', Validators.required],
    statusId: ['', Validators.required],
    lubricantInvetoryCode: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lubricantService : LubricantsInventoryService,
    private userService : UsersService,
  ) { }

  
  ngOnInit(): void {
    this. getStatus();
  }

  createLubricant(){
    this.lubricantService.createLubricant(this.newLubricantForm.value)
        .subscribe(data =>{
          Swal.fire('Exitoso', 'Creado correctamente')
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/dashboard/infrastructura/lubricantes/agregar-nuevo-lubricante']);
          });
        }, err => {
          Swal.fire('Error', err.error.msg, 'error')
        })
  }

  getStatus(){
    this.userService.getStatus()
        .subscribe(({status}) => {
          this.selectedStatus = status
        });
  };
  


}
