import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRelatorios } from './dashboard-relatorios';

describe('DashboardRelatorios', () => {
  let component: DashboardRelatorios;
  let fixture: ComponentFixture<DashboardRelatorios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRelatorios],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardRelatorios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
