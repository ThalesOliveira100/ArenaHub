import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadraInformacoes } from './quadra-informacoes';

describe('QuadraInformacoes', () => {
  let component: QuadraInformacoes;
  let fixture: ComponentFixture<QuadraInformacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadraInformacoes],
    }).compileComponents();

    fixture = TestBed.createComponent(QuadraInformacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
