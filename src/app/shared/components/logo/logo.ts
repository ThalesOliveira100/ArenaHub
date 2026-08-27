import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [RouterLink],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  host: {'[style.--titulo-color]': 'tituloColor()'}
})
export class Logo {
  public tituloColor = input<string>();
}
