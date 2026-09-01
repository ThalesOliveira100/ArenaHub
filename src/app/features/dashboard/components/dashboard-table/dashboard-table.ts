import {AfterViewInit, Component, effect, input, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatAnchor } from "@angular/material/button";
import { Evento } from '@core/models/evento.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-table',
  imports: [MatTableModule, MatPaginatorModule, MatCardModule, MatIcon, RouterLink, MatAnchor, DatePipe],
  templateUrl: './dashboard-table.html',
  styleUrl: './dashboard-table.scss',
})
export class DashboardTable {
  eventos = input.required<Evento[]>();

  displayedColumns: string[] = ['titulo', 'data', 'modalidade', 'nomeQuadra', 'publico'];

  dataSource = new MatTableDataSource<Evento>([]);

  @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
    if (value) {
      this.dataSource.paginator = value;
    }
  }

  constructor() {
    effect(() => {
      this.dataSource.data = this.eventos();
    });
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
