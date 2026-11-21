import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments.template';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Multa } from '@core/models/multa.model';

@Injectable({
  providedIn: 'root',
})
export class MultasService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getMultas(): Observable<Multa[]> {
    return this.http.get<Multa[]>(`${this.apiUrl}/multas`);
  };

  getMultasPendentes(): Observable<Multa[]> {
    return this.http.get<Multa[]>(`${this.apiUrl}/multas?status=PENDENTE`);
  }

  getMultasPorQuadra(quadraId: number): Observable<Multa[]> {
    return this.http.get<Multa[]>(`${this.apiUrl}/multas?quadraId=${quadraId}`);
  }

  getMultasPendentesPorQuadra(quadraId: number | string): Observable<Multa[]> {
    return this.http.get<Multa[]>(`${this.apiUrl}/multas?quadraId=${quadraId}&status=PENDENTE`);
  }

  getMultasPorMonitorResponsavel(monitorId: number): Observable<Multa[]> {
    return this.http.get<Multa[]>(`${this.apiUrl}/multas?monitorId=${monitorId}`);
  }

  getValorMultas(): Observable<number> {
    return this.getMultas().pipe(
      map((multas) =>
        multas
          .filter((m) => m.status === 'PENDENTE' || m.status === 'ATRASADO')
          .reduce((total, m) => total + (m.preco || 0), 0)
      )
    );
  }

  getValorMultasPorQuadra(idQuadra: number | string): Observable<number> {
  const idNum = Number(idQuadra);

  return this.getMultas().pipe(
    map((multas) =>
      multas
        .filter(
          (m) =>
            Number(m.quadraId) === idNum &&
            (m.status === 'PENDENTE' || m.status === 'ATRASADO')
        )
        .reduce((total, m) => total + (m.preco || 0), 0)
    ));
  }
}
