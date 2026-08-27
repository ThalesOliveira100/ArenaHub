import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutenticacaoService } from '@core/auth/autenticacao.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private authService = inject(AutenticacaoService);

  protected readonly footerConfig = computed(() => {
    const logado = !!this.authService.usuarioLogado();

    return logado
      ? { text: 'Ver portal público', link: '/' }
      : { text: 'Área Restrita', link: '/login' };
  });
}
