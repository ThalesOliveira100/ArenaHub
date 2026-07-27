export enum AtivoImobilCategoria {
  INFRAESTRUTURA = 'INFRAESTRUTURA',
  ELETRONICO = 'ELETRONICO',
  EQUIPAMENTO_ESPORTIVO = 'EQUIPAMENTO_ESPORTIVO'
}

export enum AtivoImobilizadoStatus {
  EXCELENTE = 'EXCELENTE',
  BOM = 'BOM',
  DANIFICADO = 'DANIFICADO'
}

export interface AtivoImobilizado {
  id: number;
  quadraId: number; // FK de quadra.id
  nome: string;
  categoria: AtivoImobilCategoria;
  quantidade: number;
  status: AtivoImobilizadoStatus;
  preco?: number;
}
