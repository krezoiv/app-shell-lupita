import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MantenimientoUserHeaderComponent } from './mantenimiento-user-header/mantenimiento-user-header.component';
import { MaintenanceNavbarComponent } from './maintenance-navbar/maintenance-navbar.component';




@NgModule({
  declarations: [
    MainHeaderComponent,
    MantenimientoUserHeaderComponent,
    SidebarComponent,
    FooterComponent,
    MaintenanceNavbarComponent,
 
  ],
  imports: [
    CommonModule,
    RouterModule
  ], exports : [
    MainHeaderComponent,
    MantenimientoUserHeaderComponent,
    SidebarComponent,
    FooterComponent,
    MaintenanceNavbarComponent
  ]
})
export class SharedModule { }
