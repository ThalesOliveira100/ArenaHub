import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Logo } from "@shared/components/logo/logo";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutenticacaoService } from '../../core/auth/autenticacao.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { toSignal } from '@angular/core/rxjs-interop';

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  MatSnackBarModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatIcon,
];

const COMPONENTS = [
  Logo
];

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MODULES,
    COMPONENTS,
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AutenticacaoService);
  private snackBar = inject(MatSnackBar);

  protected authForm!: FormGroup;
  protected escondeSenha = signal(true);
  protected mensagemErro = signal<string | null>(null);

  protected contasTeste = toSignal(this.authService.obterUsuariosTeste(), {initialValue:[]});

  get email() {
    return this.authForm.get('email');
  };

  get senha() {
    return this.authForm.get('senha');
  };

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  protected esconderSenha(event: MouseEvent) {
    this.escondeSenha.set(!this.escondeSenha());
    event.stopPropagation();
  }

  protected realizarLogin() {
    if (this.authForm.invalid) return;
    this.mensagemErro.set(null);

    const emailVal = this.email?.value;
    const senhaVal = this.senha?.value;

    this.authService.login(emailVal, senhaVal).subscribe({
      next: (usuario) => {
        this.snackBar.open(`Bem vindo, ${usuario.nome}!`, 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.mensagemErro.set(err.message);
        this.snackBar.open(err.message, 'Fechar', {
          duration: 5000,
          panelClass: ['snack-error']
        });
      }
    });
  }

  protected preencherContasExemplos(contaEmail: string, contaSenha?: string){
    this.email?.setValue(contaEmail);
    this.senha?.setValue(contaSenha || '123');
    this.mensagemErro.set(null);
  }
}
