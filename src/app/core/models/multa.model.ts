export enum MultaStatus {
  PENDENTE = 'PENDENTE',
  PAGO = 'PAGO',
  ATRASADO = 'ATRASADO'
}

export interface Multa {
  id: number;
  quadraId: number; // PK de quadra.id
  monitorId: number; // PK de usuario.id
  ativoImobilizadoId?: number; // PK de ativoImobizado.id
  nomeResponsavel: string;
  motivo: string;
  data: string;
  preco: number;
  status: MultaStatus;
}
