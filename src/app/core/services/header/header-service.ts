import { Injectable, signal } from '@angular/core';

export interface HeaderButtonConfig {
  label: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  action: () => void;
}

export interface BreadcrumbItem {
  label: string;
  route?: string;
}

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public readonly titulo = signal<string>('');
  public readonly descricao = signal<string>('');
  public readonly breadcrumbs = signal<BreadcrumbItem[]>([]);
  public readonly botaoConfig = signal<HeaderButtonConfig | null>(null);

  definirCabecalho(
      titulo: string,
      breadcrumbs: BreadcrumbItem[],
      descricao: string,
      botao?: HeaderButtonConfig
    ) {
    this.titulo.set(titulo);
    this.breadcrumbs.set(breadcrumbs);
    this.descricao.set(descricao);
    this.botaoConfig.set(botao || null);
  }

  limparBotao() {
    this.botaoConfig.set(null);
  }
}
