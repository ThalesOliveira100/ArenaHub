import { GradeHorario } from '../../../../../core/models/grade-horario.model';
import { Component, input } from '@angular/core';
import { Quadra } from '../../../../../core/models/quadra.model';
import { Horario } from './horarios/horario';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-quadra-grade-horarios',
  imports: [Horario, MatDivider],
  templateUrl: './quadra-grade-horarios.html',
  styleUrl: './quadra-grade-horarios.scss',
})
export class QuadraGradeHorarios {
  quadra = input.required<Quadra | undefined>();
  listaDeHorarios = input<GradeHorario[]>([]);
}
