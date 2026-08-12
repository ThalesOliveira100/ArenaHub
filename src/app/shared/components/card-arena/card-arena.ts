import { Quadra } from './../../../core/models/quadra.model';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPrefix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-arena',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPrefix,
],
  templateUrl: './card-arena.html',
  styleUrl: './card-arena.scss',
})
export class CardArena {
  arena = input.required<Quadra>();

  get arenaId() {
    return this.arena().id;
  }

  get arenaName() {
    return this.arena().nome;
  }

  get arenaImage(): string | undefined {
    const url = this.arena().imagemUrl;
    if (url && url.trim() !== '') {
      return url;
    }
    return undefined;
  }

  get arenaAddress(): string {
    return this.arena().endereco;
  }

  get arenaSports(): string[] {
    return this.arena().esportes;
  }
}
