export interface Evento {
  id: number;
  quadraId: number; // PK de quadra.id
  titulo: string;
  descricao: string;
  data: string;
  horaInicio: string;
  horaFinal: string;
  organizador: string;
  publicoEsperado: number;
  modalidade: string;
}
