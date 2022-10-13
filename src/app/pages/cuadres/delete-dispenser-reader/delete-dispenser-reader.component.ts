import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-dispenser-reader',
  templateUrl: './delete-dispenser-reader.component.html',
  styleUrls: ['./delete-dispenser-reader.component.css']
})
export class DeleteDispenserReaderComponent implements OnInit {

  public dispenserReader: DispenserReader[] =[]
  constructor(
    private fb: FormBuilder,
    private router : Router,
    private _dispenserService : DispensersService
  ) { }

  ngOnInit(): void {
    this.getResumeLastNumerationDispenser();
  }

  deleteForm: FormGroup = this.fb.group({
    generalDispenserReaderId : []
  })
  
  getResumeLastNumerationDispenser(){
    this._dispenserService.getResumeLastNumerationDispenser()
      .subscribe(({listNumerationDispenser, generalDispId}) => {
        this.dispenserReader = listNumerationDispenser
        this.deleteForm.controls['generalDispenserReaderId'].setValue(generalDispId.generalDispenserReaderId);
        console.log(this.deleteForm.value)
      })
  }


 
  delete(){

    Swal.fire({
      title: 'Desea eliminar registros?',
      showDenyButton: true,
     // showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._dispenserService.deleteGnralDispenserReaderAndDetail(this.deleteForm.value)
      .subscribe(({deleteDetail, deleteGnrDispenser}) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registros eliminados',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/dashboard');
      }, error => {
        Swal.fire('Error', error.error.msg, 'error')
      })
      } else if (result.isDenied) {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'Proceso Cancelado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })



    
  }
}
