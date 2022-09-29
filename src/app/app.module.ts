import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'
import {HashLocationStrategy, LocationStrategy} from '@angular/common'
import {MatTreeModule} from '@angular/material/tree';
import { ToastrModule } from 'ngx-toastr';

import { MatFormFieldModule } from '@angular/material/form-field'
import { DialogModule } from '@angular/cdk/dialog';
import {MatInputModule  } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import{ MatListModule} from '@angular/material/list'
import { MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatDatepickerModule,  } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';


import { Page404Component } from './page404/page404.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesModule } from './pages/pages.module';
import { ConfirmationsComponent } from './pages/dialogs/confirmations/confirmations.component';



@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    PagesRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    DialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    ScrollingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTreeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
   
    
  ],
  entryComponents: [ConfirmationsComponent],
  providers: [{
    provide: LocationStrategy, useClass:HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
