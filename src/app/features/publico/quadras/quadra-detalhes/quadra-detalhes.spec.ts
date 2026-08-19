import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadraDetalhes } from './quadra-detalhes';

describe('QuadraDetalhes', () => {
  let component: QuadraDetalhes;
  let fixture: ComponentFixture<QuadraDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadraDetalhes],
    }).compileComponents();

    fixture = TestBed.createComponent(QuadraDetalhes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
