import { Routes } from '@angular/router';
import { Perfil } from './core/models/perfil.model';
import { perfilGuard } from './core/auth/perfil.guard';

export const routes: Routes = [
  // Rotas Públicas
  { path: "", loadComponent: () => import('@features/publico/home/home').then(m => m.Home) },
  { path: "login", loadComponent: () => import('@features/autenticacao/auth').then(m => m.Auth) },
  { path: "quadras", loadComponent: () => import('@features/publico/quadras/quadras').then(m => m.Quadras) },
  { path: "quadras/:id", loadComponent: () => import('@features/publico/quadras/quadra-detalhes/quadra-detalhes').then(m => m.QuadraDetalhes) },

  // Rotas Privadas
  {
    path: 'dashboard',
    loadComponent: () => import('@features/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [perfilGuard]
  },
];
