import { Component, computed, inject, signal } from '@angular/core';
import { Logo } from '@shared/components/logo/logo';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SearchBar } from '@shared/components/search-bar/search-bar';
import { SelectionBar } from '@shared/components/selection-bar/selection-bar';
import { CardArena } from '@shared/components/card-arena/card-arena';
import { Footer } from "@shared/components/footer/footer";
import { CardArenaNotFound } from '@shared/components/card-arena-not-found/card-arena-not-found';
import { QuadrasService } from '../../../core/services/quadras-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";
import { AutenticacaoService } from '@core/auth/autenticacao.service';

const MODULES = [
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatDividerModule
]

const COMPONENTS = [
  Logo,
  SearchBar,
  SelectionBar,
  CardArena,
  CardArenaNotFound,
  Footer
]

@Component({
  selector: 'app-quadras',
  imports: [
    ...MODULES,
    ...COMPONENTS,
    RouterLink
],
  templateUrl: './quadras.html',
  styleUrl: './quadras.scss',
})
export class Quadras {
  private quadrasService = inject(QuadrasService);
  protected todasQuadras = toSignal(this.quadrasService.getQuadras(), {initialValue: []});
  protected termoBusca = signal('');
  protected regiaoSelecionada = signal('');
  private authService = inject(AutenticacaoService);

  protected readonly quadrasFiltradas = computed(() => {
    const termo = this.termoBusca().toLowerCase().trim();
    const regiao = this.regiaoSelecionada();

    let resultado = this.todasQuadras();

    if (regiao !== '') {
      resultado = resultado.filter(quadra => quadra.regiao === regiao);
    };

    if (termo) {
      resultado = resultado.filter((quadra) => {
        const nomeMatches = quadra.nome.toLowerCase().includes(termo);
        const esportesMatches = quadra.esportes.some(esporte => esporte.toLowerCase().includes(termo));
        const enderecoMatches = (quadra as any).endereco?.toLowerCase().includes(termo) || false;

        return nomeMatches || esportesMatches || enderecoMatches;
      });
    };

    return resultado;
  })

  protected readonly regioesDisponiveis = computed(() => {
    const regioes = this.todasQuadras().map(quadra => quadra.regiao);
    return [...new Set(regioes)];
  })

  protected readonly usuarioEhLogado = computed(() => {
    const logado = !!this.authService.estaLogado();

    return logado ? '/dashboard' : '/login';
  });
}
