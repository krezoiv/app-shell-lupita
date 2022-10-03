import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { TimerComponent } from './functions/timer/timer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingComponent } from './functions/loading/loading.component';
import { MatTree, MatTreeModule } from '@angular/material/tree';

@NgModule({
  declarations: [
    MainHeaderComponent,

    SidebarComponent,
    FooterComponent,


    TimerComponent,

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
    MatProgressSpinnerModule,
    MatTreeModule
  ], exports : [
    MainHeaderComponent,
    SidebarComponent,
    FooterComponent,
    TimerComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
