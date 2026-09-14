import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoEmDesenvolvimento } from './recurso-em-desenvolvimento';

describe('RecursoEmDesenvolvimento', () => {
  let component: RecursoEmDesenvolvimento;
  let fixture: ComponentFixture<RecursoEmDesenvolvimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursoEmDesenvolvimento],
    }).compileComponents();

    fixture = TestBed.createComponent(RecursoEmDesenvolvimento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
