import { TestBed } from '@angular/core/testing';

import { RelatoriosConsumoService } from './relatorios-consumo-service';

describe('RelatoriosConsumoService', () => {
  let service: RelatoriosConsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatoriosConsumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
