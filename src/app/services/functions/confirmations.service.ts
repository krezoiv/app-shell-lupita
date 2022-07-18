import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialog } from 'src/app/interfaces/fuelstation/confirmation-dialog.interface';
import { ConfirmationsComponent } from 'src/app/pages/dialogs/confirmations/confirmations.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationsService {

  constructor(
    private dialog: MatDialog
  ) { }

  confirmDialog(data : ConfirmationDialog): Observable<boolean>{
    return this.dialog.open(ConfirmationsComponent, {
      data,
      width : '400px',
      disableClose : true
    }).afterClosed();
  };
};
