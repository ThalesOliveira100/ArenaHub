import { inject, Injectable } from '@angular/core';
import { AutenticacaoService } from '@core/auth/autenticacao.service';
import { QuadrasStateService } from './quadras/quadras-state-service';
import { GradesStateService } from './grades/grades-state-service';
import { UserStateService } from './user/user-state-service';
import { ConsumoStateService } from './consumo/consumo-state-service';
import { EventosStateService } from './eventos/eventos-state-service';
import { MultasStateService } from './multas/multas-state-service';

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  private authService = inject(AutenticacaoService);
  private userState = inject(UserStateService);
  private quadrasState = inject(QuadrasStateService);
  private gradesState = inject(GradesStateService);
  private consumoState = inject(ConsumoStateService);
  private eventosState = inject(EventosStateService);
  private multasState = inject(MultasStateService);

  // Usuários
  public readonly usuarioLogado = this.authService.usuarioLogado;
  public readonly todosOsUsuarios = this.userState.todosOsUsuarios;

  // Quadras
  public readonly todasAsQuadras = this.quadrasState.todasAsQuadras;
  public readonly quadrasAtivas = this.quadrasState.quadrasAtivas;
  public readonly quadrasPorUsuario = this.quadrasState.quadrasPorUsuario;

  // Grade de Horarios
  public readonly gradesDoUsuario = this.gradesState.gradesDoUsuario;

  // Relatório Dados Consumo
  public readonly dadosConsumoDoUsuario = this.consumoState.dadosConsumoDoUsuario;

  // Eventos
  public readonly eventosDoUsuario = this.eventosState.eventosDoUsuario;
  public readonly todosOsEventos = this.eventosState.todosOsEventos;
  public readonly eventosEmAndamento = this.eventosState.eventosFuturos;
  public readonly eventosFuturos = this.eventosState.eventosFuturos;
  public readonly quantidadeEventosFuturos = this.eventosState.quantidadeEventosFuturos;
  public readonly eventosFormatados = this.eventosState.eventosFormatados;

  // Multas
  public readonly todasAsMultas = this.multasState.todasAsMultas;
  public readonly multasPendentes = this.multasState.multasPendentes;
}
