export enum FeedbackStatus {
  ABERTO = 'ABERTO',
  RESOLVIDO = 'RESOLVIDO',
  CANCELADO = 'CANCELADO'
}

export interface Feedback {
  id: number;
  quadraId: number; // FK de quadra.id
  monitorId: number; // FK de usuario.id
  tituto: string;
  mensagem: string;
  status: FeedbackStatus
}
