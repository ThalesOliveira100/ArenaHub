export enum QuadraStatus {
  ATIVA = 'ATIVA',
  MANUTENCAO = 'MANUTENCAO',
  INATIVA = 'INATIVA'
}

export interface Quadra {
  id: number;
  nome: string;
  regiao: string;
  status: QuadraStatus;
  esportes: string[];
  gestorId: number; // FK de usuarios.id
  monitorId: number; // FK de usuario.id
}
