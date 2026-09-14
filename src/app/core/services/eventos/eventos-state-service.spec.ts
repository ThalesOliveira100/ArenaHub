import { TestBed } from '@angular/core/testing';

import { EventosStateService } from './eventos-state-service';

describe('EventosStateService', () => {
  let service: EventosStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
