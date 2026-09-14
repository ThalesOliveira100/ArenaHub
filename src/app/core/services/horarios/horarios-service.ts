import { inject, Injectable } from '@angular/core';
import { SolicitacaoHorario } from '@core/models/solicitação-horario.model';
import { environment } from '../../../../environments/environments.template';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HorariosService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getSolicitacoesHorarios(quadraId?: number): Observable<SolicitacaoHorario[]> {
    const url = quadraId ? `${this.apiUrl}/solicitacoes_horario?quadraId=${quadraId}` : `${this.apiUrl}/solicitacoes_horario`;
    return this.http.get<SolicitacaoHorario[]>(url);
  }

  getSolicitacoesHorariosByStatus(status: string): Observable<SolicitacaoHorario[]> {
    return this.http.get<SolicitacaoHorario[]>(`${this.apiUrl}/solicitacoes_horario?status=${status}`);
  }

  getSolicitacaoHorarioById(id: number): Observable<SolicitacaoHorario[]> {
    return this.http.get<SolicitacaoHorario[]>(`${this.apiUrl}/solicitacoes_horario?id=${id}`);
  }

  sendSolicitacaoHorario(solicitacao: Omit<SolicitacaoHorario, 'id'>): Observable<SolicitacaoHorario> {
    return this.http.post<SolicitacaoHorario>(`${this.apiUrl}/solicitacoes_horario`, solicitacao);
  }
}
