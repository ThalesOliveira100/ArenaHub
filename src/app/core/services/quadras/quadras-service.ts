import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments.template';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Quadra } from '../../models/quadra.model';

@Injectable({
  providedIn: 'root',
})
export class QuadrasService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getQuadras(regiao?: string): Observable<Quadra[]> {
    const url = regiao ? `${this.apiUrl}/quadras?regiao=${regiao}` : `${this.apiUrl}/quadras`;
    return this.http.get<Quadra[]>(url);
  }

  getQuadrasAtivas(): Observable<Quadra[]> {
    const url = `${this.apiUrl}/quadras?status=ATIVA`;
    return this.http.get<Quadra[]>(url);
  }

  getQuadraPorId(id: number): Observable<Quadra> {
    return this.http.get<Quadra>(`${this.apiUrl}/quadras/${id}`);
  }

  getQuadrasByMonitor(monitorId: number) {
    return this.http.get<Quadra[]>(`${this.apiUrl}/quadras/?monitorId=${monitorId}`);
  }

  getQuadrasByGestor(gestorId: number) {
    return this.http.get<Quadra[]>(`${this.apiUrl}/quadras/?gestorId=${gestorId}`);
  }

  criarQuadra(quadra: Omit<Quadra, 'id'> | any): Observable<Quadra> {
    return this.http.post<Quadra>(`${this.apiUrl}/quadras`, quadra);
  }

  atualizarQuadra(id: string | number, quadra: Partial<Quadra>): Observable<Quadra> {
    return this.http.put<Quadra>(`${this.apiUrl}/quadras/${id}`, quadra);
  }

  deletarQuadra(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/quadras/${id}`);
  }
}
