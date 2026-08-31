import { Routes } from '@angular/router';
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
    canActivate: [perfilGuard],
    children: [
      {
        path: "",
        redirectTo: "geral",
        pathMatch: "full"
      },
      {
        path: 'geral',
        loadComponent: () => import('@features/dashboard/pages/dashboard-geral/dashboard-geral').then(m => m.DashboardGeral)
      },
      {
        path: 'quadras',
        loadComponent: () => import('@features/dashboard/pages/dashboard-quadras/dashboard-quadras').then(m => m.DashboardQuadras)
      },
      {
        path: 'horarios',
        loadComponent: () => import('@features/dashboard/pages/dashboard-horarios/dashboard-horarios').then(m => m.DashboardHorarios)
      },
      {
        path: 'eventos',
        loadComponent: () => import('@features/dashboard/pages/dashboard-eventos/dashboard-eventos').then(m => m.DashboardEventos)
      },
      {
        path: 'patrimonio',
        loadComponent: () => import('@features/dashboard/pages/dashboard-patrimonio/dashboard-patrimonio').then(m => m.DashboardPatrimonio)
      },
      {
        path: 'solicitacoes',
        loadComponent: () => import('@features/dashboard/pages/dashboard-solicitacoes/dashboard-solicitacoes').then(m => m.DashboardSolicitacoes)
      },
      {
        path: 'multas',
        loadComponent: () => import('@features/dashboard/pages/dashboard-multas/dashboard-multas').then(m => m.DashboardMultas)
      },
      {
        path: 'relatorios',
        loadComponent: () => import('@features/dashboard/pages/dashboard-relatorios/dashboard-relatorios').then(m => m.DashboardRelatorios)
      },
      {
        path: 'perfil',
        loadComponent: () => import('@features/dashboard/pages/dashboard-perfil/dashboard-perfil').then(m => m.DashboardPerfil)
      },
      {
        path: 'config',
        loadComponent: () => import('@features/dashboard/pages/dashboard-config/dashboard-config').then(m => m.DashboardConfig)
      }
    ]
  },
];
