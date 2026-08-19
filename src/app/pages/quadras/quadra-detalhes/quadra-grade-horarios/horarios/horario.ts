import { Component, input } from '@angular/core';
import { GradeHorario } from '../../../../../core/models/grade-horario.model';
import { DiaSemanaPipe } from '../../../../../shared/pipes/dia-semana.pipe';

@Component({
  selector: 'app-horario',
  imports: [
    DiaSemanaPipe
  ],
  templateUrl: './horario.html',
  styleUrl: './horario.scss',
})
export class Horario {
  dados = input.required<GradeHorario>();
}
