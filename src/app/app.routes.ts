import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { Homepage } from './pages/homepage/homepage';
import { Quadras } from './pages/quadras/quadras';
import { QuadraDetalhes } from './pages/quadras/quadra-detalhes/quadra-detalhes';

export const routes: Routes = [
  { path: "", component: Homepage},
  { path: "login", component: Auth },
  { path: "quadras", component: Quadras},
  { path: "quadras/:id", component: QuadraDetalhes}
];
