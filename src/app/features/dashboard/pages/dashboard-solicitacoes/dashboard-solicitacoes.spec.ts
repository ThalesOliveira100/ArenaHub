import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSolicitacoes } from './dashboard-solicitacoes';

describe('DashboardSolicitacoes', () => {
  let component: DashboardSolicitacoes;
  let fixture: ComponentFixture<DashboardSolicitacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSolicitacoes],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSolicitacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
