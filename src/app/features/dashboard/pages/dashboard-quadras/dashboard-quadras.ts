import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { DashboardStateService } from '@core/services/dashboard-state-service';
import { HeaderService } from '@core/services/header-service';
import { BasicGrade, ColunaGrade } from '@shared/components/basic-grade/basic-grade';
import { SearchBar } from "@shared/components/search-bar/search-bar";

@Component({
  selector: 'app-dashboard-quadras',
  imports: [
    SearchBar,
    BasicGrade,
],
  templateUrl: './dashboard-quadras.html',
  styleUrl: './dashboard-quadras.scss',
})
export class DashboardQuadras {
  private headerService = inject(HeaderService);
  private dashboardState = inject(DashboardStateService);

  protected readonly quadras = this.dashboardState.quadrasPorUsuario;
  protected readonly usuarioLogado = this.dashboardState.usuarioLogado;

  protected readonly permissoes = computed(() => {
    const perfil = this.usuarioLogado()?.perfil;

    return {
      criar: perfil === 'ADMIN',
      editar: perfil === 'ADMIN' || perfil === 'GESTOR',
      excluir: perfil === 'ADMIN',
      visualizar: perfil === 'ADMIN' || perfil === 'GESTOR' || perfil === 'MONITOR'
    };
  });

  protected readonly colunasConfig: ColunaGrade[] = [
    { key: 'nome', label: 'Quadra' },
    { key: 'regiao', label: 'Região' },
    { key: 'esportes', label: 'Modalidades', type: 'chips' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'acoes', label: 'Ações', type: 'actions' }
  ];

  constructor() {
    effect(() => {
      const podeCriar = this.permissoes().criar;

      this.headerService.definirCabecalho(
        'Quadras',
        'Quadras',
        'Estrutura, modalidades e equipe responsável por cada quadra.',
        podeCriar ? {
          label: 'Nova Quadra',
          icon: 'add',
          color: 'primary',
          action: () => this.abrirModalCriar()
        } : undefined
      );
    });
  };

  onAcaoExecutada(event: { acao: string; item: any }) {
    const quadra = event.item;

    switch (event.acao) {
      case 'visualizar':
        this.visualizarQuadra(quadra);
        break;

      case 'editar':
        this.editarQuadra(quadra);
        break;

      case 'excluir':
        this.excluirQuadra(quadra);
        break;
    }
  }

  abrirModalCriar() { console.log(`Abrir modal de criação`)}
  private visualizarQuadra(quadra: any) { console.log(`Visualizar quadra: ${quadra}`) }
  private editarQuadra(quadra: any) { console.log(`Editar quadra: ${quadra}`) }
  private excluirQuadra(quadra: any) { console.log(`Excluir quadra: ${quadra}`) }
}
