import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { Page404Component } from './page404/page404.component';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  {path : '', redirectTo: '/login', pathMatch : 'full'},
  {path :'**',  component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PagesRoutingModule,
  AuthRoutingModule],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
