import { StatusSolicitacao } from "./status-solicitacao.model";

export interface SolicitacaoAtivo {
  id: number;
  quadraId: number; // PK de quadra.id
  monitorId: number; // PK de monitor.id
  nomeEquipamento: string;
  quantidade: number;
  status: StatusSolicitacao;
  justificativa: string;
  rejeicaoMensagem?: string;
  preco?: number;
}
