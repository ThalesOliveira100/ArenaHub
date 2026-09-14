import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recurso-em-desenvolvimento',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './recurso-em-desenvolvimento.html',
  styleUrl: './recurso-em-desenvolvimento.scss',
})
export class RecursoEmDesenvolvimento {

  voltar(): void {
    window.history.back();
  }
}
