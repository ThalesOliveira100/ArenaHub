import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPatrimonio } from './dashboard-patrimonio';

describe('DashboardPatrimonio', () => {
  let component: DashboardPatrimonio;
  let fixture: ComponentFixture<DashboardPatrimonio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPatrimonio],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPatrimonio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
