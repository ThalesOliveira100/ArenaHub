import { TestBed } from '@angular/core/testing';

import { ConsumoStateService } from './consumo-state-service';

describe('ConsumoStateService', () => {
  let service: ConsumoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
