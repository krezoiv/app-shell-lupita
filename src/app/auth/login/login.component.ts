import { Component, OnInit, Input } from '@angular/core';
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
  userName! : string 
  
  public loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
    user:['']
  });

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
  }


  /** Login Method */
  login(){
   
    this.authService.login( this.loginForm.value as LoginForm )
    .subscribe( resp => {
     
      this.router.navigateByUrl('/dashboard');
      this.userLogged();
     
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
    }) 
  }

  /** 
   *? gets user logged
   */
  userLogged(){
    this.authService.userLooged(this.loginForm.value as LoginForm)
      .subscribe(({userDB}) => {
       

        this.loginForm.controls['user'].setValue(userDB.firstName);
        this.userName = userDB.firstName
      
        Swal.fire({
          title: "Bienvenido! " + this.userName,
          text: "Shell Lupita",
          timer:1000
        })
      }) 
  }

}

