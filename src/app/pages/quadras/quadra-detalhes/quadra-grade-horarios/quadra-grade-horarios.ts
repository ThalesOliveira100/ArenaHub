import { GradeHorario } from '../../../../core/models/grade-horario.model';
import { Component, input } from '@angular/core';
import { Quadra } from '../../../../core/models/quadra.model';
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
  listaDeHorarios: GradeHorario[] = [
    {
      id: 0,
      quadraId: 1,
      diaDaSemana: 1,
      horaInicio: '18:00',
      horaFinal: '19:30',
      esporte: 'Futsal',
      solicitanteNome: 'Liga Centro'
    },
    {
      id: 1,
      quadraId: 1,
      diaDaSemana: 1,
      horaInicio: '19:30',
      horaFinal: '21:00',
      esporte: 'Vôlei',
      solicitanteNome: 'Thales'
    },
    {
      id: 2,
      quadraId: 1,
      diaDaSemana: 2,
      horaInicio: '08:00',
      horaFinal: '10:00',
      esporte: 'Vôlei',
      solicitanteNome: 'Vôlei NeoPL'
    }
  ]
}
