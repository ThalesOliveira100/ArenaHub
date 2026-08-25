import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Quadra } from '../models/quadra.model';
import { SolicitacaoHorario } from '../models/solicitação-horario.model';
import { GradeHorario } from '@core/models/grade-horario.model';

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

  getQuadraPorId(id: number): Observable<Quadra> {
    return this.http.get<Quadra>(`${this.apiUrl}/quadras/${id}`);
  }

  getQuadrasByMonitor(monitorId: number) {
    return this.http.get<Quadra[]>(`${this.apiUrl}/quadras/?monitorId=${monitorId}`);
  }

  getQuadrasByGestor(gestorId: number) {
    return this.http.get<Quadra[]>(`${this.apiUrl}/quadras/?gestorId=${gestorId}`);
  }

  getGradesHorariosByQuadras(quadraIds: number[]): Observable<GradeHorario[]> {
    if (!quadraIds || quadraIds.length === 0) {
      return of([]);
    }

    const query = quadraIds.map(id => `quadraId=${id}`).join('&');

    return this.http.get<GradeHorario[]>(`${this.apiUrl}/grade_horarios?${query}`);
  }

  sendSolicitacaoHorario(solicitacao: Omit<SolicitacaoHorario, 'id'>): Observable<SolicitacaoHorario> {
    return this.http.post<SolicitacaoHorario>(`${this.apiUrl}/solicitacoes_horario`, solicitacao);
  }
}
