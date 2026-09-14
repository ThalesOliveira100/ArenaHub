import { TestBed } from '@angular/core/testing';

import { QuadrasService } from './quadras-service';

describe('QuadrasService', () => {
  let service: QuadrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuadrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
