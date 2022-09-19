import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseByOrderComponent } from './purchase-by-order.component';

describe('PurchaseByOrderComponent', () => {
  let component: PurchaseByOrderComponent;
  let fixture: ComponentFixture<PurchaseByOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseByOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseByOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
