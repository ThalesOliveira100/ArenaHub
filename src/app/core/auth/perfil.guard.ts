import { Perfil } from './../models/perfil.model';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';

export const perfilGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacaoService);
  const router = inject(Router);

  if (!authService.estaLogado()) {
    router.navigate(['/login'], {
      queryParams: { redirecionarPara: state.url }
    });
    return false;
  }

  // Recupera os perfis permitidos configurados na rota
  const perfisPermitidos = route.data['perfis'] as Array<Perfil>;

  // Se a rota não exigir perfis específicos, o acesso é liberado (basta estar logado)
  if (!perfisPermitidos || perfisPermitidos.length === 0) {
    return true;
  }

  // Verifica se o perfil do usuário logado tem permissão para a rota
  const perfilUsuario = authService.perfilUsuario();

  if (perfilUsuario && perfisPermitidos.includes(perfilUsuario)) {
    return true;
  }

  // Se o usuário estiver logado mas não tiver permissão, manda para o Dashboard padrão dele
  router.navigate(['/dashboard']);
  return false;
};
