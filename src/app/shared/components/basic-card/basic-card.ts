import { Component, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-basic-card',
  imports: [MatIconModule, MatCardModule],
  templateUrl: './basic-card.html',
  styleUrl: './basic-card.scss',
  host: {
    '[style.--card-width]': 'cardWidth()',
    '[style.--card-color]': 'cardColor()',
    '[style.--card-desc-color]': 'cardDescColor()',
    '[style.--card-title-font-size]':'cardTitleFontSize()',
    '[style.--card-border]': 'cardBorder()',
    '[style.--card-height]': 'cardHeight()',
  }
})
export class BasicCard {
  public icon = input<String>('');
  public title = input.required<String>();
  public desc = input.required<String>();

  public cardWidth = input<string>();
  public cardHeight = input<string>();
  public cardColor = input<string>();
  public cardDescColor = input<string>();
  public cardTitleFontSize = input<string>();
  public cardBorder = input<string>();
}
