import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadraReservaForm } from './quadra-reserva-form';

describe('QuadraReservaForm', () => {
  let component: QuadraReservaForm;
  let fixture: ComponentFixture<QuadraReservaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadraReservaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(QuadraReservaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
