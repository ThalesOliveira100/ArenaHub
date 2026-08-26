import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments.template';
import { Observable } from 'rxjs';
import { GradeHorario } from '../models/grade-horario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GradeHorarioService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getGradeHorarios(): Observable<GradeHorario[]> {
    return this.http.get<GradeHorario[]>(`${this.apiUrl}/grade_horarios?`);
  }

  getGradeHorariosPorId(quadraId: number): Observable<GradeHorario[]> {
    return this.http.get<GradeHorario[]>(`${this.apiUrl}/grade_horarios?quadraId=${quadraId}`);
  }

  // getGradeHorariosPorGestorOuMonitor(idGestorMonitor: number): Observable<GradeHorario[]> {
  //   const todasAsGrades = this.getGradeHorarios()
  //   const gradesPorIdDoGestor = todasAsGrades.
  // }
}
