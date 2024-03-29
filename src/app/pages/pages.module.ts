import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './user/users/users.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CreateUsersComponent } from './user/create-users/create-users.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
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
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DigitizeDispenserComponent } from './cuadres/digitize-dispenser/digitize-dispenser.component';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmationsComponent } from './dialogs/confirmations/confirmations.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { UpdateDispenserReaderDialogComponent } from './dialogs/dispensers/update-dispenser-reader-dialog/update-dispenser-reader-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TimerComponent } from '../shared/functions/timer/timer.component';
import { SalesControlComponent } from './cuadres/sales-control/sales-control.component';
import { PurchasesComponent } from './purchase/purchases/purchases.component';
import { PurchasesOrderComponent } from './purchase/purchases-order/purchases-order.component';
import { MainPurchaseComponent } from './purchase/main-purchase/main-purchase.component';
import { LoadingComponent } from '../shared/functions/loading/loading.component';
import { InventoryComponent } from './inventory/inventory/inventory.component';
import { SalesByNoDocumentComponent } from './reportingModule/sales-reporting/sales-by-no-document/sales-by-no-document.component';
import { SalesByDatesComponent } from './reportingModule/sales-reporting/sales-by-dates/sales-by-dates.component';
import { PurchaseByDatesComponent } from './reportingModule/purchases-reporting/purchase-by-dates/purchase-by-dates.component';
import { PurchaseByOrderComponent } from './reportingModule/purchases-reporting/purchase-by-order/purchase-by-order.component';
import { UpdatePasswordComponent } from './dialogs/users/update-password/update-password.component';
import { UpdateUsersComponent } from './dialogs/users/update-users/update-users.component';
import { DeleteDispenserReaderComponent } from './cuadres/delete-dispenser-reader/delete-dispenser-reader.component';
import { DeleteSalesControlComponent } from './cuadres/delete-sales-control/delete-sales-control.component';
import { DeletePurchaseOrderComponent } from './purchase/delete-purchase-order/delete-purchase-order.component';

import { DeletePurchaseComponent } from './purchase/delete-purchase/delete-purchase.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { AppliedPurchaseComponent } from './purchase/applied-purchase/applied-purchase.component';
import { AccumulatedSalesComponent } from './cuadres/accumulated-sales/accumulated-sales.component';
import { OilInventoryComponent } from './inventory/oil-inventory/oil-inventory.component';
import { CreateLubricantsComponent } from './infrastructure/lubricants/create-lubricants/create-lubricants.component';
import { LubricantsDailyEntryComponent } from './cuadres/lubricants-daily-entry/lubricants-daily-entry.component';




@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    PagesComponent,
    CreateUsersComponent,
    ListUsersComponent,
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
    DigitizeDispenserComponent,
    ConfirmationsComponent,
    UpdateDispenserReaderDialogComponent,
    SalesControlComponent,
    PurchasesComponent,
    PurchasesOrderComponent,
    MainPurchaseComponent,
    InventoryComponent,
    SalesByNoDocumentComponent,
    SalesByDatesComponent,
    PurchaseByDatesComponent,
    PurchaseByOrderComponent,
    UpdatePasswordComponent,
    UpdateUsersComponent,
    DeleteDispenserReaderComponent,
    DeleteSalesControlComponent,
    DeletePurchaseOrderComponent,
    DeletePurchaseComponent,
    UpdateUserComponent,
    AppliedPurchaseComponent,
    AccumulatedSalesComponent,
    OilInventoryComponent,
    CreateLubricantsComponent,
    LubricantsDailyEntryComponent,
  
   
    
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
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    ScrollingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSnackBarModule


  ],
  exports : [
    DashboardComponent,
    UsersComponent,
    TimerComponent,
    LoadingComponent, 
    InventoryComponent
  
  ]
})
export class PagesModule { }
