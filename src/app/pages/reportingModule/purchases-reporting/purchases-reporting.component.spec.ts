import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesReportingComponent } from './purchases-reporting.component';

describe('PurchasesReportingComponent', () => {
  let component: PurchasesReportingComponent;
  let fixture: ComponentFixture<PurchasesReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesReportingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
