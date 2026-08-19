import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadraGradeHorarios } from './quadra-grade-horarios';

describe('QuadraGradeHorarios', () => {
  let component: QuadraGradeHorarios;
  let fixture: ComponentFixture<QuadraGradeHorarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadraGradeHorarios],
    }).compileComponents();

    fixture = TestBed.createComponent(QuadraGradeHorarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
