import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-card',
  imports: [
    MatCardModule,
    MatIconModule,

  ],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.scss',
})
export class DashboardCard {
  title = input.required<string>();
  value = input.required<number>();
  subtitle = input.required<string>();
  icon = input.required<string>();

}
