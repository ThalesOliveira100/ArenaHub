import { TestBed } from '@angular/core/testing';

import { QuadrasStateService } from './quadras-state-service';

describe('QuadrasStateService', () => {
  let service: QuadrasStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuadrasStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
