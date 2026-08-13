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

const quadras: Quadra[] = [
  {
    id: 1,
    nome: 'Centro Poliesportivo de Pedro Leopoldo - CEPPEL',
    regiao: 'Pedro Leopoldo',
    endereco: 'R. Anélio Caldas, 185 - Centro',
    status: QuadraStatus.MANUTENCAO,
    esportes: ['vôlei', 'futsal', 'basquete', 'badminton', 'queimada'],
    gestorId: 1,
    monitorId: 1,
    imagemUrl: 'https://pl.mg.gov.br/wp-content/uploads/2026/07/Homem-e-preso-apos-furtar-ferramentas-de-reforma-do-CEPPEL.jpeg'
  },
  {
    id: 2,
    nome: 'PL Beach',
    regiao: 'Pedro Leopoldo',
    endereco: 'Av. Cel. Juventino Dias, 584 - CENTRO',
    status: QuadraStatus.ATIVA,
    esportes: ['futvolei', 'volei de areia'],
    gestorId: 1,
    monitorId: 1
  },
  {
    id: 3,
    nome: 'Ginásio Municipal Poliesportivo Dr. Márcio Reinaldo',
    regiao: 'Matozinhos',
    endereco: 'R. João Gonçalves de Oliveira, 201 - São Pedro',
    status: QuadraStatus.ATIVA,
    esportes: ['vôlei', 'futsal', 'judô'],
    gestorId: 1,
    monitorId: 1,
    imagemUrl: 'https://cdn6.campograndenews.com.br/uploads/noticias/2020/03/10/24lrysd7ur1cc.jpg'
  },
  {
    id: 4,
    nome: 'Ginásio Poliesportivo Municipal de Confins',
    regiao: 'Confins',
    endereco: 'R. Raimunda Marques, Confins - MG',
    status: QuadraStatus.ATIVA,
    esportes: ['volei', 'futsal', 'tênis de mesa'],
    gestorId: 1,
    monitorId: 1,
    imagemUrl: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnBlSKUPMEA8naKcmmJk0c_8lcXRwNDo1JKRAz1Yv7ItA3hLUqFtfOvHZEInLXpU-4MU-IPBLv9SNBmEtt1ERMUg6YUj3-4JFI-n3TsjJLTLkuBsPSmZWXxukadGqWRp55JPBF7NQ=s680-w680-h510-rw'
  }
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
