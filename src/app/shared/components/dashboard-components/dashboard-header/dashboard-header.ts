import { Component, input, output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDivider } from "@angular/material/divider";
import { Usuario } from '../../../../core/models/usuario.model';
import { IniciaisPipe } from '@shared/pipes/iniciais.pipe';

const MODULES = [
  MatSidenavModule,
  MatButtonModule,
  MatBadgeModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatDivider
]

@Component({
  selector: 'app-dashboard-header',
  imports: [
    MODULES,
    IniciaisPipe
],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.scss',
})
export class DashboardHeader {
  sidenav = input.required<MatSidenav>();
  usuarioLogado = input.required<Usuario | null>();
  logout = output<void>();

}
