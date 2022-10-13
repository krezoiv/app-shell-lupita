import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './user/users/users.component';

import { AuthGuard } from '../guards/auth.guard';
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
import { DigitizeDispenserComponent } from './cuadres/digitize-dispenser/digitize-dispenser.component';
import { SalesControlComponent } from './cuadres/sales-control/sales-control.component';
import { PurchasesOrderComponent } from './purchase/purchases-order/purchases-order.component';
import { PurchasesComponent } from './purchase/purchases/purchases.component';
import { MainPurchaseComponent } from './purchase/main-purchase/main-purchase.component';
import { InventoryComponent } from './inventory/inventory/inventory.component';
import { SalesByNoDocumentComponent } from './reportingModule/sales-reporting/sales-by-no-document/sales-by-no-document.component';
import { SalesByDatesComponent } from './reportingModule/sales-reporting/sales-by-dates/sales-by-dates.component';
import { AdminRoleGuard } from '../guards/admin-role.guard';
import { PurchaseByDatesComponent } from './reportingModule/purchases-reporting/purchase-by-dates/purchase-by-dates.component';
import { PurchaseByOrderComponent } from './reportingModule/purchases-reporting/purchase-by-order/purchase-by-order.component';
import { SuperRoleGuard } from '../guards/super-role.guard';
import { GuestRoleGuard } from '../guards/guest-role.guard';
import { UserRoleGuard } from '../guards/user-role.guard';
import { DeleteDispenserReaderComponent } from './cuadres/delete-dispenser-reader/delete-dispenser-reader.component';
import { DeleteSalesControlComponent } from './cuadres/delete-sales-control/delete-sales-control.component';





const routes: Routes =[
  { path : 'dashboard', component: PagesComponent,
  canActivate : [AuthGuard],
  children :[
    {path: '', component: DashboardComponent},
    {path : 'users', component: UsersComponent},
    {path : 'usuarios/listado-usuarios', canActivate:[UserRoleGuard], component : ListUsersComponent},
    {path : 'usuario/agregar-usuario', canActivate:[GuestRoleGuard, UserRoleGuard, ], component : CreateUsersComponent},
    {path : 'infrastructura/islas/agregar-isla', canActivate:[GuestRoleGuard, UserRoleGuard], component : CreateIslandComponent},
    {path : 'infrastructura/islas/listado-islas', component : ListIslandComponent},
    {path : 'infrastructura/dispensadores/agregar-dispensador', canActivate:[GuestRoleGuard, UserRoleGuard], component : CreateDispensersComponent},
    {path : 'infrastructura/dispensadores/listado-dispensadores', component : ListDispensersComponent},
    {path : 'infrastructura/tanques/agregar-tanque', canActivate:[GuestRoleGuard, UserRoleGuard] , component : CreateTanksComponent},
    {path : 'infrastructura/tanques/listado-tanques', component : ListTanksComponent},
    {path : 'infrastructura/combustibles/agregar-combustible', canActivate:[GuestRoleGuard, UserRoleGuard], component : CreateFuelsComponent},
    {path : 'infrastructura/combustibles/listado-combustibles', component : ListFuelsComponent},
    {path : 'infrastructura/manguera/agregar-manguera', canActivate:[GuestRoleGuard, UserRoleGuard], component : CreateHoseComponent},
    {path : 'infrastructura/manguera/listar-mangueras', component : ListHoseComponent},
    {path : 'infrastructura/manguera/asignacion-de-manguera', canActivate:[GuestRoleGuard, UserRoleGuard], component : AssignmentsHosesComponent},
  
    {path : 'cuadres/digitalizacion-de-bombas', canActivate:[GuestRoleGuard], component: DigitizeDispenserComponent},
    {path : 'cuadres/cierre-de-ventas', canActivate:[GuestRoleGuard], component: SalesControlComponent},
    {path : 'compras/orden-de-pedido', canActivate:[GuestRoleGuard], component: PurchasesOrderComponent},
    {path : 'compras/generar-factura', canActivate:[GuestRoleGuard], component: PurchasesComponent},
    {path : 'compras', canActivate:[GuestRoleGuard], component: MainPurchaseComponent},
    {path : 'inventario', component: InventoryComponent},
    {path : 'reporteria/reporteVentasporDocumento',  component: SalesByNoDocumentComponent},
    {path : 'reporteria/reporteVentasporFechas', component: SalesByDatesComponent},
    {path : 'reporteria/reporteComprasporNumeroDeOrden', component : PurchaseByOrderComponent},
    {path : 'reporteria/reporteComprasporFechas', component: PurchaseByDatesComponent},
    {path : 'cuadres/eliminar-digitalizacion-de-bombas', component: DeleteDispenserReaderComponent},
    {path : 'cuadres/eliminar-cierre-de-venta', component: DeleteSalesControlComponent},
    

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
