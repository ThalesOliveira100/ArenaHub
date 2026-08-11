import { Component, input } from '@angular/core';
import { MatFormField } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-selection-bar',
  imports: [
    MatFormField,
    MatSelectModule,
  ],
  templateUrl: './selection-bar.html',
  styleUrl: './selection-bar.scss',
  host: {'[style.--width]': 'width()'}
})
export class SelectionBar {
  width = input<String>('');
  label = input<string>('');
  options = input<string[]>([]);
}
