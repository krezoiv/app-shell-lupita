import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/loginform.interface';
import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css',
  ]
})
export class LoginComponent implements OnInit {
  
  public formSubmitted = false;

  public loginForm = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
  }

  login(){
    console.log( this.loginForm.value)
    this.authService.login( this.loginForm.value as LoginForm )
    .subscribe( resp => {
      this.router.navigateByUrl('/dashboard');
      Swal.fire('Bienvenido', 'A Shell Lupita');
      
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
    }) 
  }

}

