import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceNavbarComponent } from './maintenance-navbar.component';

describe('MaintenanceNavbarComponent', () => {
  let component: MaintenanceNavbarComponent;
  let fixture: ComponentFixture<MaintenanceNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
