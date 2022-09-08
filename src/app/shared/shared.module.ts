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
import { CuadresNavbarComponent } from './cuadres-navbar/cuadres-navbar.component';
import { CuadresComponent } from '../pages/cuadres/cuadres/cuadres.component';
import { TimerComponent } from './functions/timer/timer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PurchaseNavbarComponent } from './purchase-navbar/purchase-navbar.component';
import { LoadingComponent } from './functions/loading/loading.component';

@NgModule({
  declarations: [
    MainHeaderComponent,
    MantenimientoUserHeaderComponent,
    SidebarComponent,
    FooterComponent,
    MaintenanceNavbarComponent,
    CuadresNavbarComponent,
    TimerComponent,
    PurchaseNavbarComponent,
    LoadingComponent,
 
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
    MatMenuModule,
    MatProgressSpinnerModule
  ], exports : [
    MainHeaderComponent,
    MantenimientoUserHeaderComponent,
    SidebarComponent,
    FooterComponent,
    MaintenanceNavbarComponent,
    CuadresNavbarComponent,
    TimerComponent,
    PurchaseNavbarComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
