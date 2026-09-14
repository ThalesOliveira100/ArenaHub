import { TestBed } from '@angular/core/testing';

import { GradesStateService } from './grades-state-service';

describe('GradesStateService', () => {
  let service: GradesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
