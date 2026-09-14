import { computed, inject, Injectable } from '@angular/core';
import { AutenticacaoService } from '@core/auth/autenticacao.service';
import { QuadrasStateService } from '../quadras/quadras-state-service';
import { EventosService } from './eventos-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { parseDataEHora } from '@core/utils/date.utils';

@Injectable({
  providedIn: 'root',
})
export class EventosStateService {
  private authService = inject(AutenticacaoService);
  private eventosService = inject(EventosService);
  private quadrasService = inject(QuadrasStateService);
  private usuarioLogado = this.authService.usuarioLogado;
  private quadrasPorUsuario = this.quadrasService.quadrasPorUsuario;

  public readonly eventosDoUsuario = toSignal(
    toObservable(this.usuarioLogado).pipe(
      switchMap((usuario) => {
        if (!usuario || !usuario.id) {
          return of([]);
        }

        if (usuario.perfil === 'ADMIN') {
          return this.eventosService.getEventos();
        }

        const quadras = this.quadrasPorUsuario();
        if (quadras.length === 0) {
          return of([]);
        }

        const ids = quadras.map((q) => q.id);
        const requests = ids.map(id => this.eventosService.getEventosPorQuadra(id));

        return forkJoin(requests).pipe(
          map(resultados => resultados.flat())
        );
      }),
    ),
    { initialValue: [] },
  );

  public readonly todosOsEventos = toSignal(this.eventosService.getEventos(), { initialValue: []});

  public readonly eventosEmAndamento = computed(() => {
    const lista = this.todosOsEventos();
    if (!lista || lista.length === 0) return [];

    const agora = new Date();

    return lista.filter((evento) => {
      if (!evento?.data || !evento?.horaInicio || !evento?.horaFinal) return false;

      const inicio = parseDataEHora(evento.data, evento.horaInicio);
      const fim = parseDataEHora(evento.data, evento.horaFinal);

      return agora >= inicio && agora <= fim;
    });
  });

  public readonly eventosFuturos = computed(() => {
    const lista = this.todosOsEventos();
    if (!lista || lista.length === 0) return [];

    const agora = new Date();

    return lista.filter(evento => {
      if (!evento || !evento.data || !evento.horaFinal) return false;

      const dataHoraFim = parseDataEHora(evento.data, evento.horaFinal);

      return dataHoraFim >= agora;
    });
  });

  public readonly quantidadeEventosFuturos = computed(() => this.eventosFuturos().length);

  public readonly eventosFormatados = computed(() => {
    const eventos = this.eventosFuturos();
    const quadras = this.quadrasService.todasAsQuadras();

    if (!eventos || eventos.length === 0) return [];

    return eventos.map(evento => {
      const quadra = quadras.find(q => q.id === evento.quadraId);

      return {
        ...evento,
        nomeQuadra: quadra ? quadra.nome : `Quadra (ID: ${evento.quadraId})`
      };
    });
  });

}
