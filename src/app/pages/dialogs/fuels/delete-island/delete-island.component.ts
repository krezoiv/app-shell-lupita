import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Island } from 'src/app/models/fuelstation/island.models';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-island',
  templateUrl: './delete-island.component.html',
  styleUrls: ['./delete-island.component.css']
})


/**
 * ! class that is use to delete island
 */
export class DeleteIslandComponent implements OnInit {

  deleteIslandForm! : FormGroup;

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private islandService : IslandsService,
    @Inject(MAT_DIALOG_DATA) public island : Island,
    private dialogRef : MatDialogRef<DeleteIslandComponent>

  ) { }

  ngOnInit(): void {

    this.deleteIslandForm = this.fb.group({
      islandNumber : ['', Validators.required]
    })

    if(this.island){
      this.deleteIslandForm.controls['islandNumber'].setValue(this.island.islandNumber);
    }
  }

  deleteIsland(){
    
    const data ={
      islandId : this.island.islandId
    }

    this.islandService.deleteIsland
    (data).subscribe(resp =>{
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/dashboard/infrastructure/island/listIsland']));
    this.deleteIslandForm.reset();
    Swal.fire('Eliminado', ` Eliminado Correctamente`, 'success');
    this.dialogRef.close('actualizado');


  }, err => {
    Swal.fire('Error', err.error.msg, 'error')
  })

  }

}
