import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventos } from './dashboard-eventos';

describe('DashboardEventos', () => {
  let component: DashboardEventos;
  let fixture: ComponentFixture<DashboardEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEventos],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardEventos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
