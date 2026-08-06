import { Usuario } from '../../core/models/usuario.model';
import { contasTeste } from '../../core/auth/contasTestes';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Logo } from "../../shared/components/logo/logo";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

const MODULES = [
  CommonModule,
  ReactiveFormsModule
];

const COMPONENTS = [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIcon,
    Logo
];

@Component({
  selector: 'app-auth',
  imports: [
    ...MODULES,
    ...COMPONENTS
],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth implements OnInit {
  protected authForm!: FormGroup;
  protected escondeSenha = signal(true);
  _contasTeste: Array<Usuario> = contasTeste;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {};

  get email() {
    return this.authForm.get('email');
  };

  get senha() {
    return this.authForm.get('senha');
  };

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  protected esconderSenha(event: MouseEvent) {
    this.escondeSenha.set(!this.escondeSenha());
    event.stopPropagation();
  }

  protected realizarLogin() {
    if (this.authForm.valid) {
      // login do usuário teste
      console.log(`Usuário logado.
                  email:${this.email?.value}
                  senha:${this.senha?.value}
                  `);

      this.router.navigate(['/dashboard']);
    }
  }

  protected preencherContasExemplos(contaEmail: string, contaSenha?: string){
    this.email?.setValue(contaEmail);
    this.senha?.setValue(contaSenha);
  }
}
