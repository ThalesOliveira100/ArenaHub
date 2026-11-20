import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments.template';
import { Observable } from 'rxjs';
import { AtivoImobilizado } from '@core/models/ativo-imobilizado.model';

@Injectable({
  providedIn: 'root',
})
export class AtivosService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAtivos(): Observable<AtivoImobilizado[]> {
    return this.http.get<AtivoImobilizado[]>(`${this.apiUrl}/ativos_imobilizados`);
  }

  getAtivosPorId(id: number): Observable<AtivoImobilizado[]> {
    return this.http.get<AtivoImobilizado[]>(`${this.apiUrl}/ativos_imobilizados/${id}`);
  }

  getAtivosPorQuadra(quadraId: number): Observable<AtivoImobilizado[]> {
    return this.http.get<AtivoImobilizado[]>(`${this.apiUrl}/ativos_imobilizados?quadraId=${quadraId}`);
  }
}
