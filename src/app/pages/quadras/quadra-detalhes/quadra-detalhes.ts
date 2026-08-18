import { Component, inject, input } from '@angular/core';
import { Logo } from '../../../shared/components/logo/logo';
import { Footer } from '../../../shared/components/footer/footer';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SelectionBar } from '../../../shared/components/selection-bar/selection-bar';
import { MatInputModule } from '@angular/material/input';
import { quadras } from '../../../core/auth/quadrasTeste';
import { QuadraReservaForm } from "./quadra-reserva-form/quadra-reserva-form";
import { QuadraInformacoes } from "./quadra-informacoes/quadra-informacoes";
import { Quadra } from '../../../core/models/quadra.model';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { QuadraGradeHorarios } from "./quadra-grade-horarios/quadra-grade-horarios";

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
export class QuadraDetalhes {
  private route = inject(ActivatedRoute);
  id = input<string>();

  get quadra(): Quadra | undefined {
    const idUrl = this.route.snapshot.paramMap.get('id');

    console.log(idUrl)
    if (!idUrl) return undefined;

    return quadras.find(quadra => quadra.id === Number(idUrl));
  }
}
