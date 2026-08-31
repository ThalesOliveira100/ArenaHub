import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConfig } from './dashboard-config';

describe('DashboardConfig', () => {
  let component: DashboardConfig;
  let fixture: ComponentFixture<DashboardConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
