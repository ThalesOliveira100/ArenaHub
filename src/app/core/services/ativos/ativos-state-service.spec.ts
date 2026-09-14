import { TestBed } from '@angular/core/testing';

import { AtivosStateService } from './ativos-state-service';

describe('AtivosStateService', () => {
  let service: AtivosStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtivosStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
