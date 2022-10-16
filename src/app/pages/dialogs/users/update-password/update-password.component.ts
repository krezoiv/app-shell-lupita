import { ParseSourceFile } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  passA = String;
  passB = String;
  public user: Users[] = []
  updatePasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public usuario: Users,
    private dialogRef: MatDialogRef<UpdatePasswordComponent>

  ) { }


  ngOnInit(): void {
    this.updatePasswordForm = this.fb.group({
      passwordA: ['', Validators.required],
      passwordB: ['', Validators.required],
      password: [],
      email: [],
      firstName: [],

    })

    if (this.authService.usuario) {
      this.updatePasswordForm.controls['email'].setValue(this.authService.usuario.email)
      this.updatePasswordForm.controls['firstName'].setValue(this.authService.usuario.firstName)
    }
  }

  save() {
    Swal.fire({
      title: 'Desea modificar contraseña?',
      showDenyButton: true,
     // showCancelButton: true,
      confirmButtonText: 'Modifacar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
       
    this.passA = this.updatePasswordForm.get('passwordA')?.value;
    this.passB = this.updatePasswordForm.get('passwordB')?.value;

    if(this.updatePasswordForm.get('passwordA')?.value === '' && this.updatePasswordForm.get('passwordB')?.value === ''){
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: "Campos Vacios",
        timer: 3500
      })
      return
    }
    if (this.passA !== this.passB) {
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: "Contraseñas no coinciden",
        timer: 3500
      })
    } else {

      this.updatePasswordForm.controls['password'].setValue(this.passA)
      this.updatePassword();
    }
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

  updatePassword() {
    this.userService.updatePassword(this.updatePasswordForm.value)
      .subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Contraseña Modificada Exitosa!!',
          showConfirmButton: false,
          timer: 1500
        })
        this.logOut();
        this.dialogRef.close();
      }, err => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }

  logOut() {
    this.authService.logOut();
  }

  
}
