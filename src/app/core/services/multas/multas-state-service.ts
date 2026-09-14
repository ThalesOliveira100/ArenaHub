import { MultasService } from './multas-service';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MultasStateService {
  private multasService = inject(MultasService);

  public readonly todasAsMultas = toSignal(this.multasService.getMultas(), { initialValue: [] });

  public readonly multasPendentes = toSignal(this.multasService.getMultasPendentes(), { initialValue: [] });
}
