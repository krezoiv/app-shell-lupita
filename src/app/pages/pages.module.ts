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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UpdatePriceComponent } from './dialogs/fuels/update-price/update-price.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { DeleteFuelDialogComponent } from './dialogs/fuels/delete-fuel-dialog/delete-fuel-dialog.component';
import { UpdateFuelDialogComponent } from './dialogs/fuels/update-fuel-dialog/update-fuel-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { UpdateIslandComponent } from './dialogs/fuels/update-island/update-island.component';
import { DeleteIslandComponent } from './dialogs/fuels/delete-island/delete-island.component';
import { DeleteDispenserDialogComponent } from './dialogs/dispensers/delete-dispenser-dialog/delete-dispenser-dialog.component';
import { UpdateDispenserDialogComponent } from './dialogs/dispensers/update-dispenser-dialog/update-dispenser-dialog.component';
import { UpdateTankDialogComponent } from './dialogs/tanks/update-tank-dialog/update-tank-dialog.component';
import { DeleteTankDialogComponent } from './dialogs/tanks/delete-tank-dialog/delete-tank-dialog.component';
import { CreateHoseComponent } from './infrastructure/hoses/create-hose/create-hose.component';
import { ListHoseComponent } from './infrastructure/hoses/list-hose/list-hose.component';
import { UpdateHosesComponent } from './dialogs/hoses/update-hoses/update-hoses.component';
import { DeleteHosesComponent } from './dialogs/hoses/delete-hoses/delete-hoses.component';
import { AssignmentsHosesComponent } from './infrastructure/dispensers/assignments-hoses/assignments-hoses.component';



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
    ListFuelsComponent,
    UpdatePriceComponent,
    DeleteFuelDialogComponent,
    UpdateFuelDialogComponent,
    UpdateIslandComponent,
    DeleteIslandComponent,
    DeleteDispenserDialogComponent,
    UpdateDispenserDialogComponent,
    UpdateTankDialogComponent,
    DeleteTankDialogComponent,
    CreateHoseComponent,
    ListHoseComponent,
    UpdateHosesComponent,
    DeleteHosesComponent,
    AssignmentsHosesComponent,
   
    
  ],
  imports: [
    CommonModule,
    SharedModule, 
    RouterModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule


  ],
  exports : [
    DashboardComponent,
    UsersComponent,
    CouponsComponent,
    MaintenancesComponent
  
  ]
})
export class PagesModule { }
