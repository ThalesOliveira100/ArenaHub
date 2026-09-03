import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

export interface ColunaGrade {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'chips' | 'actions'
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
    visualizar: true
  }

  private _dados: any[] = [];
  @Input() set dados(value: any[]) {
    this._dados = value || [];
    this.dataSource.data = this._dados;
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

  emitirAcao(acao: string, item: any) {
    this.acaoDisparada.emit({ acao, item });
  }
}
