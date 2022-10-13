import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DispenserReader } from 'src/app/models/fuelstation/dispensers.model';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';

@Component({
  selector: 'app-delete-dispenser-reader',
  templateUrl: './delete-dispenser-reader.component.html',
  styleUrls: ['./delete-dispenser-reader.component.css']
})
export class DeleteDispenserReaderComponent implements OnInit {

  public dispenserReader: DispenserReader[] =[]
  constructor(
    private fb: FormBuilder,
    private _dispenserService : DispensersService
  ) { }

  ngOnInit(): void {
    this.getResumeLastNumerationDispenser();
  }

  deleteForm: FormGroup = this.fb.group({
    generalDispenserId : []
  })
  
  getResumeLastNumerationDispenser(){
    this._dispenserService.getResumeLastNumerationDispenser()
      .subscribe(({listNumerationDispenser, generalDispId}) => {
        this.dispenserReader = listNumerationDispenser
        this.deleteForm.controls['generalDispenserId'].setValue(generalDispId.generalDispenserReaderId);
        console.log(this.deleteForm.value)
      })
  }
}
