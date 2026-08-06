import { Perfil } from './../models/perfil.model';
import { Usuario } from './../models/usuario.model';

export const contasTeste: Array<Usuario> = [
  {
    id: 1,
    nome: "Administrador MG 1",
    email: "admin1@arenahub.gov.br",
    senha: "admmgarena",
    perfil: Perfil.ADMIN,
    regiao: "MG"
  },
  {
    id: 2,
    nome: "Gestor MG 1",
    email: "gestor1@arenahub.gov.br",
    senha: "gestormgarena",
    perfil: Perfil.GESTOR,
    regiao: "MG"
  },
  {
    id: 3,
    nome: "Monitor MG 1",
    email: "monitor1@arenahub.gov.br",
    senha: "monitormgarena",
    perfil: Perfil.MONITOR,
    regiao: "MG"
  }
]
