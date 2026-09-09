import { DashboardStateService } from './../../../core/services/dashboard-state-service';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BasicCard } from '../basic-card/basic-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  imports: [
    BasicCard,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  private stateService = inject(DashboardStateService);

  protected readonly quadras = this.stateService.todasAsQuadras;
  protected readonly quadrasAtivas = this.stateService.quadrasAtivas;
  protected readonly usuarios = this.stateService.todosOsUsuarios;
  protected readonly totalEventos = this.stateService.quantidadeEventosFuturos;
}
