import { TestBed } from '@angular/core/testing';

import { HorariosStateService } from './horarios-state-service';

describe('HorariosStateService', () => {
  let service: HorariosStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariosStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
