import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AutenticacaoService } from '@core/auth/autenticacao.service';
import { HeaderService } from '@core/services/header/header-service';
import { QuadrasStateService } from '@core/services/quadras/quadras-state-service';
import { BasicGrade, ColunaGrade } from '@shared/components/basic-grade/basic-grade';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';
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
  private authService = inject(AutenticacaoService);
  private headerService = inject(HeaderService);
  private quadrasState = inject(QuadrasStateService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  protected readonly termoBusca = signal<string>('');
  protected readonly quadras = this.quadrasState.quadrasPorUsuario;
  protected readonly usuarioLogado = this.authService.usuarioLogado;

  protected readonly permissoes = computed(() => {
    const perfil = this.usuarioLogado()?.perfil;

    return {
      criar: perfil === 'ADMIN' ,
      editar: perfil === 'ADMIN' || perfil === 'GESTOR',
      excluir: perfil === 'ADMIN',
      visualizar: perfil === 'ADMIN' || perfil === 'GESTOR' || perfil === 'MONITOR'
    };
  });

  protected readonly colunasConfig: ColunaGrade[] = [
    { key: 'nome', label: 'Quadra', type: 'main-title', sortable: true },
    { key: 'regiao', label: 'Região', sortable: true },
    { key: 'esportes', label: 'Modalidades', type: 'chips' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'acoes', label: 'Ações', type: 'actions' }
  ];

  constructor() {
    effect(() => {
      const podeCriar = this.permissoes().criar;

      this.headerService.definirCabecalho(
        'Quadras',
        [
          { label: 'Início', route: '/dashboard/geral'},
          { label: 'Quadras' }
        ],
        'Estrutura, modalidades e equipe responsável por cada quadra.',
        podeCriar ? {
          label: 'Nova Quadra',
          icon: 'add',
          color: 'primary',
          action: () => this.createQuadra()
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

  onSearch(termo: string) {
    this.termoBusca.set(termo);
  }

  protected readonly quadrasFiltradas = computed(() => {
    const termo = this.termoBusca().toLowerCase().trim();
    const lista = this.quadras();

    if (!termo) return lista;

    return lista.filter((q) => {
      const nomeMatch = q.nome.toLowerCase().includes(termo);
      const regiaoMatch = q.regiao.toLowerCase().includes(termo);
      const esporteMatch = Array.isArray(q.esportes)
        ? q.esportes.some(e => e.toLowerCase().includes(termo))
        : false;

      return nomeMatch || regiaoMatch || esporteMatch;
    });
  });

  private createQuadra () {
    this.router.navigate(['/dashboard/quadras/criar']);
  }

  private visualizarQuadra(quadra: any) {
    this.router.navigate(['/quadras', quadra.id]);
  }

  private editarQuadra(quadra: any) {
    this.router.navigate(['/dashboard/quadras/editar', quadra.id]);
  }

  private excluirQuadra(quadra: any) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '420px',
      data: {
        titulo: 'Excluir Quadra',
        mensagem: `Tem certeza que deseja excluir a quadra "${quadra.nome}"? Esta ação não poderá ser desfeita.`,
        textoConfirmar: 'Excluir Quadra',
        textoCancelar: 'Cancelar',
        corBotao: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.quadrasState.deletarQuadra(quadra.id).subscribe({
          next: () => {
            this.snackBar.open('Quadra excluída com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          error: (err) => {
            console.error('Erro ao excluir quadra:', err);
            this.snackBar.open('Erro ao tentar excluir a quadra.', 'Fechar', {
              duration: 4000
            });
          }
        });
      }
    });
  }
}
