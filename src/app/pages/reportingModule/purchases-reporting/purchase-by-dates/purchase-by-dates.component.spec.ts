import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseByDatesComponent } from './purchase-by-dates.component';

describe('PurchaseByDatesComponent', () => {
  let component: PurchaseByDatesComponent;
  let fixture: ComponentFixture<PurchaseByDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseByDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseByDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
