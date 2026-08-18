import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Quadra } from '../../../../core/models/quadra.model';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormConfig } from '../../../../core/models/form-config.interface';
import { SelectionBar } from "../../../../shared/components/selection-bar/selection-bar";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quadra-reserva-form',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTimepickerModule,
    ReactiveFormsModule,
    SelectionBar
],
  templateUrl: './quadra-reserva-form.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './quadra-reserva-form.scss',
})
export class QuadraReservaForm implements OnInit {
  private _snackBar = inject(MatSnackBar);
  reservaForm!: FormGroup;

  dadosReservaForm!: FormGroup;
  formConfig!: FormConfig;

  quadra = input.required<Quadra | undefined>();

  nome = new FormControl('');
  email = new FormControl('');



  ngOnInit(): void {

  }

  onSubmit(): void {
    this.exibirMensagemDePedidoEnviado();
    this.limparFormulario();

  }

  protected exibirMensagemDePedidoEnviado(): void {
    this._snackBar.open('Pedido de reserva enviado! O gestor entrará em contato.', '', {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 5000,
    });
  }

  protected limparFormulario(): void {

  }
}
