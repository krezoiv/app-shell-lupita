import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './user/users/users.component';
import { CouponsComponent } from './coupons/coupons.component';
import { AuthGuard } from '../guards/auth.guard';
import { MaintenancesComponent } from './maintenances/maintenances.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { CreateUsersComponent } from './user/create-users/create-users.component';
import { CreateIslandComponent } from './infrastructure/islands/create-island/create-island.component';
import { ListIslandComponent } from './infrastructure/islands/list-island/list-island.component';
import { CreateDispensersComponent } from './infrastructure/dispensers/create-dispensers/create-dispensers.component';
import { ListDispensersComponent } from './infrastructure/dispensers/list-dispensers/list-dispensers.component';
import { CreateTanksComponent } from './infrastructure/tanks/create-tanks/create-tanks.component';
import { ListTanksComponent } from './infrastructure/tanks/list-tanks/list-tanks.component';
import { CreateFuelsComponent } from './infrastructure/fuels/create-fuels/create-fuels.component';
import { ListFuelsComponent } from './infrastructure/fuels/list-fuels/list-fuels.component';
import { CreateHoseComponent } from './infrastructure/hoses/create-hose/create-hose.component';
import { ListHoseComponent } from './infrastructure/hoses/list-hose/list-hose.component';
import { AssignmentsHosesComponent } from './infrastructure/dispensers/assignments-hoses/assignments-hoses.component';
import { CuadresComponent } from './cuadres/cuadres/cuadres.component';
import { DigitizeDispenserComponent } from './cuadres/digitize-dispenser/digitize-dispenser.component';
import { SalesControlComponent } from './cuadres/sales-control/sales-control.component';
import { PurchasesOrderComponent } from './purchase/purchases-order/purchases-order.component';
import { PurchasesComponent } from './purchase/purchases/purchases.component';
import { MainPurchaseComponent } from './purchase/main-purchase/main-purchase.component';


const routes: Routes =[
  { path : 'dashboard', component: PagesComponent,
  canActivate : [AuthGuard],
  children :[
    {path: '', component: DashboardComponent},
    {path : 'users', component: UsersComponent},
    {path : 'coupons', component : CouponsComponent},
    {path : 'maintenances', component : MaintenancesComponent},
    {path : 'users/listUsers', component : ListUsersComponent},
    {path : 'users/newUser', component : CreateUsersComponent},
    {path : 'infrastructure/island/newIsland', component : CreateIslandComponent},
    {path : 'infrastructure/island/listIsland', component : ListIslandComponent},
    {path : 'infrastructure/disenpensers/newDispenser', component : CreateDispensersComponent},
    {path : 'infrastructure/dispensers/listDispensers', component : ListDispensersComponent},
    {path : 'infrastructure/tanks/newTank', component : CreateTanksComponent},
    {path : 'infrastructure/tanks/listTanks', component : ListTanksComponent},
    {path : 'infrastructure/fuels/newFuel', component : CreateFuelsComponent},
    {path : 'infrastructure/fuels/listFuels', component : ListFuelsComponent},
    {path : 'infrastructure/hoses/newHoses', component : CreateHoseComponent},
    {path : 'infrastructure/hoses/listHoses', component : ListHoseComponent},
    {path : 'infrastructure/assignmentsHoses', component : AssignmentsHosesComponent},
    {path : 'cuadres', component: CuadresComponent},
    {path : 'cuadres/digitalizacionBombas', component: DigitizeDispenserComponent},
    {path : 'cuadres/controlVentas', component: SalesControlComponent},
    {path : 'compras/ordenPedido', component: PurchasesOrderComponent},
    {path : 'compras/nuevaCompra', component: PurchasesComponent},
    {path : 'compras', component: MainPurchaseComponent}

  ]},
  
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports : [
    RouterModule
  ]
})
export class PagesRoutingModule { }
