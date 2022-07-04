import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hoses } from 'src/app/models/fuelstation/hoses.models';
import { HosesService } from 'src/app/services/fuelstation/hoses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-hoses',
  templateUrl: './delete-hoses.component.html',
  styleUrls: ['./delete-hoses.component.css']
})
export class DeleteHosesComponent implements OnInit {

  deleteHoseForm! : FormGroup;

  constructor(
    private fb : FormBuilder,
    private rotuer : Router,
    private hoseService : HosesService,
    @Inject(MAT_DIALOG_DATA) public hoses : Hoses,
    private dialogRef : MatDialogRef<DeleteHosesComponent>
  ) { }

  ngOnInit(): void {

    this.deleteHoseForm = this.fb.group({
      hoseColor : ['', Validators.required]
    });

    if(this.hoses){
      this.deleteHoseForm.controls['hoseColor'].setValue(this.hoses.hoseColor );
    };
  };


  deleteHose(){
    const {hoseColor} = this.deleteHoseForm.value;
    const data ={
      hoseId : this.hoses.hoseId
    };

    this.hoseService.deleteHose
      (data).subscribe(resp => {
        this.rotuer.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
        this.rotuer.navigate(['/dashboard/infrastructure/hoses/listHoses']));
      this.deleteHoseForm.reset();
      Swal.fire('Eliminado', `Manguera ${hoseColor} Eliminado Correctamente`, 'success');
      this.dialogRef.close('Eliminado');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }
};
