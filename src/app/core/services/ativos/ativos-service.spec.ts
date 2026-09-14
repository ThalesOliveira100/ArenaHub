import { TestBed } from '@angular/core/testing';

import { AtivosService } from './ativos-service';

describe('AtivosService', () => {
  let service: AtivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
