import { Component, computed, signal } from '@angular/core';
import { Logo } from '../../shared/components/logo/logo';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SearchBar } from '../../shared/components/search-bar/search-bar';
import { SelectionBar } from '../../shared/components/selection-bar/selection-bar';
import { Quadra, QuadraStatus } from '../../core/models/quadra.model';
import { CardArena } from '../../shared/components/card-arena/card-arena';
import { Footer } from "../../shared/components/footer/footer";
import { BasicCard } from '../../shared/components/basic-card/basic-card';
import { CardArenaNotFound } from '../../shared/components/card-arena-not-found/card-arena-not-found';
import { quadras } from '../../core/auth/quadrasTeste';

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
    MODULES,
    COMPONENTS,
],
  templateUrl: './quadras.html',
  styleUrl: './quadras.scss',
})
export class Quadras {
  protected termoBusca = signal('');
  protected regiaoSelecionada = signal('');

  protected readonly quadrasFiltradas = computed(() => {
    const termo = this.termoBusca().toLowerCase().trim();
    const regiao = this.regiaoSelecionada();

    let resultado = quadras;

    if (regiao !== '') {
      resultado = resultado.filter(quadra => quadra.regiao === regiao);
    };

    if (termo) {
      resultado = resultado.filter((quadra) => {
        return  quadra.nome.toLocaleLowerCase().includes(termo) ||
                quadra.endereco.toLocaleLowerCase().includes(termo) ||
                quadra.esportes.includes(termo)
      });
    }

    return resultado;
  })

  protected getRegioesPorQuadra() {
    let regioes: string[] = [];

    for (let quadra of quadras) {
      const regiao = quadra.regiao;
      if (!regioes.includes(regiao)) {
        regioes.push(regiao);
      }
    }

    return regioes;
  }
}
