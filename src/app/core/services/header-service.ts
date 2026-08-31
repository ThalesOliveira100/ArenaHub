import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public readonly janelaAtual = signal<string>('');
  public readonly titulo = signal<string>('');
  public readonly descricao = signal<string>('');

  definirCabecalho(janela: string, titulo: string, descricao: string) {
    this.janelaAtual.set(janela);
    this.titulo.set(titulo)
    this.descricao.set(descricao);
  }
}
