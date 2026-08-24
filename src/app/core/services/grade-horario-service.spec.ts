import { TestBed } from '@angular/core/testing';

import { GradeHorarioService } from './grade-horario-service';

describe('GradeHorarioService', () => {
  let service: GradeHorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeHorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
