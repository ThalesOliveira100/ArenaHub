import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-search-bar',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  host: {'[style.--width]': 'width()'}
})
export class SearchBar {
  label = input<String>('');
  width = input<String>('');
  value = signal('');
}
