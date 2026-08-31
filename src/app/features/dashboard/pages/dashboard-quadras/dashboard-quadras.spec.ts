import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardQuadras } from './dashboard-quadras';

describe('DashboardQuadras', () => {
  let component: DashboardQuadras;
  let fixture: ComponentFixture<DashboardQuadras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardQuadras],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardQuadras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
