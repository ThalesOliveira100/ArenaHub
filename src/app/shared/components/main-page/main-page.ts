import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BasicCard } from '../basic-card/basic-card';

@Component({
  selector: 'app-main-page',
  imports: [
    BasicCard,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  protected readonly quantQuadrasCadastradas: number = 4;
  protected readonly quantQuadrasAtivas: number = 3;
  protected readonly quantEventosAgendados: number = 3;
  protected readonly quantPerfisDeAcesso: number = 67;

}
