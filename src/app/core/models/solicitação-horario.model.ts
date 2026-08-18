import { Perfil } from "./perfil.model";

export enum SolicitacaoHorarioStatus {
  RESERVADO = 'RESERVADO',
  DISPONIVEL = 'DISPONIVEL',
  SUSPENSO = 'SUSPENSO',
  INDISPONIVEL = 'INDISPONIVEL'
}

export interface SolicitacaoHorario {
  id: number;
  quadraId: number; // PK de quadra.id
  horarioId: number; // PK de grade-horario.id      --> Será definido breviamente os horários que o user pode selecionar
  data: string;
  horaInicio: string;
  horaFinal: string;
  esporte: string;
  solicitanteNome: string;
  solicitanteContato: string;
  solicitantePerfil: Perfil;
  status: SolicitacaoHorarioStatus;
  rejeicaoMensagem?: string;
}
