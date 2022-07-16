import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dispensers } from 'src/app/models/fuelstation/dispensers.model';
import { Island } from 'src/app/models/fuelstation/island.models';
import { DispensersService } from 'src/app/services/fuelstation/dispensers.service';
import { IslandsService } from 'src/app/services/fuelstation/islands.service';

@Component({
  selector: 'app-digitize-dispenser',
  templateUrl: './digitize-dispenser.component.html',
  styleUrls: ['./digitize-dispenser.component.css']
})
export class DigitizeDispenserComponent implements OnInit {

  color = 'accent';
  public selectedIsland : Island[]=[];
  public selectedDispenser : Dispensers[]=[];
  digitizeForm: FormGroup = this.fb.group({

  })

  constructor(
    private fb : FormBuilder,
    private islandService : IslandsService,
    private dispenserService : DispensersService

  ) { }

  ngOnInit(): void {
    this.getDispenser();
  }

  getIsland(){
    this.islandService.getIslandsActive()
        .subscribe(({island}) => {
          this.selectedIsland = island
        });
  };

  getDispenser(){
  this.dispenserService.getDIspensers()
      .subscribe(({dispenser}) => {
        this.selectedDispenser = dispenser
      });

  }




}
