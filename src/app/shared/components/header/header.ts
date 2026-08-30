import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Logo } from "../logo/logo";
import { AutenticacaoService } from '@core/auth/autenticacao.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatToolbarModule,
    Logo,
    RouterLink
],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(AutenticacaoService);

  protected readonly headerConfig = computed(() => {
    const logado = !!this.authService.usuarioLogado();

    return logado
      ? { text: 'Ir para o painel', link: '/dashboard' }
      : { text: 'Entrar', link: '/login' };
  });


  protected direcionarParaLogin() {

  }
}
