import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';


/**
 * ?  path to login page
 */
const routes : Routes = [
  {path : 'login', component : LoginComponent}
  
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ], exports :[
    RouterModule
  ]
})
export class AuthRoutingModule { }
