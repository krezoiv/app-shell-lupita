import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoUserHeaderComponent } from './mantenimiento-user-header.component';

describe('MantenimientoHeaderComponent', () => {
  let component: MantenimientoUserHeaderComponent;
  let fixture: ComponentFixture<MantenimientoUserHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoUserHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoUserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
