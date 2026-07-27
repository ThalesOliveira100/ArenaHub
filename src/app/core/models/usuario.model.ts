import { Perfil } from "./perfil.model";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string // Opcional no front por segurança
  perfil: Perfil;
  regiao: string;
}
