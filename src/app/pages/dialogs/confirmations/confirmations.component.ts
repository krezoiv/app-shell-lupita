import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/interfaces/fuelstation/confirmation-dialog.interface';

@Component({
  selector: 'app-confirmations',
  templateUrl: './confirmations.component.html',
  styleUrls: ['./confirmations.component.css']
})
export class ConfirmationsComponent implements OnInit {

  constructor(
   public dialogRef: MatDialogRef<ConfirmationsComponent>,
   @Inject(MAT_DIALOG_DATA) public message : string
  ) { }

  ngOnInit(): void {


  }

}
