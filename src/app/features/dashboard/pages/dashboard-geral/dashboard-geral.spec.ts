import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGeral } from './dashboard-geral';

describe('DashboardGeral', () => {
  let component: DashboardGeral;
  let fixture: ComponentFixture<DashboardGeral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGeral],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardGeral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
