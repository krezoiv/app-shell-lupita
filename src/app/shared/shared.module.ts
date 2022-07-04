import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MantenimientoUserHeaderComponent } from './mantenimiento-user-header/mantenimiento-user-header.component';
import { MaintenanceNavbarComponent } from './maintenance-navbar/maintenance-navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

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
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule
  ], exports : [
    MainHeaderComponent,
    MantenimientoUserHeaderComponent,
    SidebarComponent,
    FooterComponent,
    MaintenanceNavbarComponent
  ]
})
export class SharedModule { }
