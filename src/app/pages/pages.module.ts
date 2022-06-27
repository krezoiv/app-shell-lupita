import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './user/users/users.component';
import { CouponsComponent } from './coupons/coupons.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CreateUsersComponent } from './user/create-users/create-users.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { MaintenancesComponent } from './maintenances/maintenances.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateIslandComponent } from './infrastructure/islands/create-island/create-island.component';
import { ListIslandComponent } from './infrastructure/islands/list-island/list-island.component';
import { ListDispensersComponent } from './infrastructure/dispensers/list-dispensers/list-dispensers.component';
import { CreateDispensersComponent } from './infrastructure/dispensers/create-dispensers/create-dispensers.component';
import { CreateTanksComponent } from './infrastructure/tanks/create-tanks/create-tanks.component';
import { ListTanksComponent } from './infrastructure/tanks/list-tanks/list-tanks.component';
import { CreateFuelsComponent } from './infrastructure/fuels/create-fuels/create-fuels.component';
import { ListFuelsComponent } from './infrastructure/fuels/list-fuels/list-fuels.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    CouponsComponent,
    PagesComponent,
    CreateUsersComponent,
    ListUsersComponent,
    MaintenancesComponent,
    CreateIslandComponent,
    ListIslandComponent,
    ListDispensersComponent,
    CreateDispensersComponent,
    CreateTanksComponent,
    ListTanksComponent,
    CreateFuelsComponent,
    ListFuelsComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    RouterModule,
    ReactiveFormsModule
  ],
  exports : [
    DashboardComponent,
    UsersComponent,
    CouponsComponent,
    MaintenancesComponent
  
  ]
})
export class PagesModule { }
