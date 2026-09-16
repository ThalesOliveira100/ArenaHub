import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-basic-form-card',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './basic-form-card.html',
  styleUrl: './basic-form-card.scss',
})
export class BasicFormCard {
  // Inputs via Signal
  title = input<string>('');
  subtitle = input<string>('');
  submitLabel = input<string>('Salvar');
  cancelLabel = input<string>('Cancelar');
  icon = input<string>('save');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);

  // Outputs via Outputs
  submitted = output<void>();
  cancelled = output<void>();

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    if (!this.disabled() && !this.loading()) {
      this.submitted.emit();
    }
  }

  onCancel() {
    this.cancelled.emit();
  }
}
