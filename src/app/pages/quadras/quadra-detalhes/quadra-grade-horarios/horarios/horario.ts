import { Component, input } from '@angular/core';
import { GradeHorario } from '../../../../../core/models/grade-horario.model';

@Component({
  selector: 'app-horario',
  imports: [],
  templateUrl: './horario.html',
  styleUrl: './horario.scss',
})
export class Horario {
  dados = input.required<GradeHorario | undefined>();
}
