import { MultasService } from './multas-service';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Multa } from '@core/models/multa.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultasStateService {
  private multasService = inject(MultasService);

  public readonly todasAsMultas = toSignal(this.multasService.getMultas(), { initialValue: [] });

  public readonly multasPendentes = toSignal(this.multasService.getMultasPendentes(), { initialValue: [] });

  public readonly getValorMultas = toSignal(this.multasService.getMultas(), { initialValue: [] });

  public getMultasPendentesPorQuadra(idQuadra: number): Observable<Multa[]> {
    return this.multasService.getMultasPendentesPorQuadra(idQuadra);
  }

  public getMultasPorQuadra(idQuadra: number): Observable<Multa[]> {
    return this.multasService.getMultasPorQuadra(idQuadra);
  };

  public getValorMultasPorQuadra(idQuadra: number): Observable<number> {
    return this.multasService.getValorMultasPorQuadra(idQuadra);
  };
}
