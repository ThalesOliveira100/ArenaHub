export enum AtivoImobilCategoria {
  INFRAESTRUTURA = 'INFRAESTRUTURA',
  ELETRONICO = 'ELETRONICO',
  EQUIPAMENTO_ESPORTIVO = 'EQUIPAMENTO_ESPORTIVO',
}

export enum AtivoImobilizadoStatus {
  OTIMO = 'ÓTIMO',
  BOM = 'BOM',
  REGULAR = 'REGULAR',
  RUIM = 'RUIM',
  DANIFICADO = 'DANIFICADO'
}

export interface AtivoImobilizado {
  id: number;
  quadraId: number; // FK de quadra.id
  nome: string;
  categoria: AtivoImobilCategoria;
  quantidade: number;
  status: AtivoImobilizadoStatus;
  aquisicao: string;
  observacoes?: string;
  preco?: number;
}
