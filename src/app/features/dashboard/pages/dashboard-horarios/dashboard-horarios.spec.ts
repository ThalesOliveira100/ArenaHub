import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHorarios } from './dashboard-horarios';

describe('DashboardHorarios', () => {
  let component: DashboardHorarios;
  let fixture: ComponentFixture<DashboardHorarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHorarios],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHorarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
