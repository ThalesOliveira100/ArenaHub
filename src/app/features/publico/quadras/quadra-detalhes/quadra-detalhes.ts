import { Component, inject, OnInit, signal } from '@angular/core';
import { Logo } from '@shared/components/logo/logo';
import { Footer } from '@shared/components/footer/footer';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { QuadraReservaForm } from "./quadra-reserva-form/quadra-reserva-form";
import { QuadraInformacoes } from "./quadra-informacoes/quadra-informacoes";
import { ActivatedRoute } from '@angular/router';
import { QuadraGradeHorarios } from "./quadra-grade-horarios/quadra-grade-horarios";
import { QuadrasService } from '@core/services/quadras-service';
import { GradeHorarioService } from '@core/services/grade-horario-service';

const MODULES = [
  MatDividerModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
]

const COMPONENTS = [
  Logo,
  Footer,
  QuadraReservaForm,
  QuadraInformacoes,
  QuadraGradeHorarios
]

@Component({
  selector: 'app-quadra-detalhes',
  imports: [
    MODULES,
    COMPONENTS,
],
  templateUrl: './quadra-detalhes.html',
  styleUrl: './quadra-detalhes.scss',
})
export class QuadraDetalhes implements OnInit {
  private route = inject(ActivatedRoute);
  private quadrasService = inject(QuadrasService);
  private gradeHorarioService = inject(GradeHorarioService);

  quadraId = Number(this.route.snapshot.paramMap.get('id'));
  quadra = signal<any>(null);
  gradeHorarios = signal<any[]>([]);

  ngOnInit(): void {
    this.quadrasService.getQuadraPorId(this.quadraId).subscribe(dados => this.quadra.set(dados));
    this.gradeHorarioService.getGradeHorarios().subscribe(dados => this.gradeHorarios.set(dados));
  }
}
