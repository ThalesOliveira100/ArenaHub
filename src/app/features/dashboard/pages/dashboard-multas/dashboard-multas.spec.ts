import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMultas } from './dashboard-multas';

describe('DashboardMultas', () => {
  let component: DashboardMultas;
  let fixture: ComponentFixture<DashboardMultas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMultas],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMultas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
