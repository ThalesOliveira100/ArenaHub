import { Injectable, signal } from '@angular/core';

export interface HeaderButtonConfig {
  label: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  action: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public readonly janelaAtual = signal<string>('');
  public readonly titulo = signal<string>('');
  public readonly descricao = signal<string>('');
  public readonly botaoConfig = signal<HeaderButtonConfig | null>(null);

  definirCabecalho(janela: string, titulo: string, descricao: string, botao?: HeaderButtonConfig) {
    this.janelaAtual.set(janela);
    this.titulo.set(titulo);
    this.descricao.set(descricao);
    this.botaoConfig.set(botao || null);
  }

  limparBotao() {
    this.botaoConfig.set(null);
  }
}
