import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments.template';
import { Observable, of } from 'rxjs';
import { RelatorioConsumo } from '@core/models/relatorio-consumo.model';

@Injectable({
  providedIn: 'root',
})
export class RelatoriosConsumoService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/relatorios_consumo`;

  getDadosConsumo(quadraId?: string): Observable<RelatorioConsumo[]> {
    const url = quadraId ? `${this.apiUrl}?quadraId=${quadraId}` : this.apiUrl;

    return this.http.get<RelatorioConsumo[]>(url);
  }

  getDadosConsumoByAno(ano: string): Observable<RelatorioConsumo[]> {
    const url = `${this.apiUrl}?ano=${ano}`;

    return this.http.get<RelatorioConsumo[]>(url);
  }

  getDadosConsumoByQuadraAndMesAndAno(quadraId: string, mes: string, ano: string) {
    const url = `${this.apiUrl}?quadraId=${quadraId}&mes=${mes}&ano=${ano}`;

    return this.http.get<RelatorioConsumo[]>(url);
  }

  getDadosConsumoPorQuadras(quadraIds: number[]): Observable<RelatorioConsumo[]> {
    if (!quadraIds || quadraIds.length === 0) {
      return of([]);
    }

    const query = quadraIds.map(id => `quadraId=${id}`).join('&');
    return this.http.get<RelatorioConsumo[]>(`${this.apiUrl}?${query}`);
  }
}
