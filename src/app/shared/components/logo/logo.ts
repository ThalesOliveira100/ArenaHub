import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  host: {'[style.--titulo-color]': 'tituloColor()'}
})
export class Logo {
  public tituloColor = input<string>();
}
