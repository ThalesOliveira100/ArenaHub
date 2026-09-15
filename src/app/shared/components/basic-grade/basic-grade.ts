import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

export interface ColunaGrade {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'chips' | 'actions' | 'main-title';
  sortable?: boolean;
}

@Component({
  selector: 'app-basic-grade',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './basic-grade.html',
  styleUrl: './basic-grade.scss',
})
export class BasicGrade {
  @Input() colunas: ColunaGrade[] = [];

  @Input() permissoes = {
    criar: false,
    editar: false,
    excluir: false,
    visualizar: false
  }

  protected readonly colunaOrdenada = signal<string | null>(null);
  protected readonly direcaoOrdenacao = signal<'asc' | 'desc'>('asc');

  private _dados: any[] = [];
  @Input() set dados(value: any[]) {
    this._dados = value || [];
    this.dataSource.data = this._dados;
    this.aplicarOrdenacao();
  };

  get dados(): any[] {
    return this._dados;
  };

  @Output() acaoDisparada = new EventEmitter<{ acao: string, item: any }>();

  get displayedColumns(): string[] {
    return this.colunas.map(c => c.key);
  };

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
    if (value) {
      this.dataSource.paginator = value;
    }
  };

  alternarOrdenacao(chave: string) {
    if (this.colunaOrdenada() === chave) {
      if (this.direcaoOrdenacao() === 'asc') {
        this.direcaoOrdenacao.set('desc');
      } else {
        // Terceiro clique: limpa a ordenação
        this.colunaOrdenada.set(null);
        this.direcaoOrdenacao.set('asc');
      }
    } else {
      this.colunaOrdenada.set(chave);
      this.direcaoOrdenacao.set('asc');
    }

    this.aplicarOrdenacao();
  }

  private aplicarOrdenacao() {
    const chave = this.colunaOrdenada();
    const direcao = this.direcaoOrdenacao();
    const dados = [...this._dados];

    if (!chave) {
      this.dataSource.data = dados;
      return;
    }

    this.dataSource.data = dados.sort((a, b) => {
      let valorA = a[chave];
      let valorB = b[chave];

      // Tratamento para arrays (ex: lista de modalidades)
      if (Array.isArray(valorA)) valorA = valorA.join(', ');
      if (Array.isArray(valorB)) valorB = valorB.join(', ');

      if (valorA == null) return 1;
      if (valorB == null) return -1;

      let comparacao = 0;
      if (typeof valorA === 'number' && typeof valorB === 'number') {
        comparacao = valorA - valorB;
      } else {
        comparacao = String(valorA).localeCompare(String(valorB), 'pt-BR', {
          numeric: true,
          sensitivity: 'base',
        });
      }

      return direcao === 'asc' ? comparacao : -comparacao;
    });
  }

  emitirAcao(acao: string, item: any) {
    this.acaoDisparada.emit({ acao, item });
  }
}
