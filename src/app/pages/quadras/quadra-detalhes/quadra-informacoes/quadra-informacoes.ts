import { Component, input } from '@angular/core';
import { Quadra } from '../../../../core/models/quadra.model';
import { MatIconModule } from '@angular/material/icon';
import { CardArenaNotFound } from "../../../../shared/components/card-arena-not-found/card-arena-not-found";

@Component({
  selector: 'app-quadra-informacoes',
  imports: [
    MatIconModule,
    CardArenaNotFound
],
  templateUrl: './quadra-informacoes.html',
  styleUrl: './quadra-informacoes.scss',
})
export class QuadraInformacoes {
  quadra = input.required<Quadra | undefined>();
}
