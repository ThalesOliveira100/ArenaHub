import { TestBed } from '@angular/core/testing';

import { MultasStateService } from './multas-state-service';

describe('MultasStateService', () => {
  let service: MultasStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultasStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
