import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadraForm } from './quadra-form';

describe('QuadraForm', () => {
  let component: QuadraForm;
  let fixture: ComponentFixture<QuadraForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadraForm],
    }).compileComponents();

    fixture = TestBed.createComponent(QuadraForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
