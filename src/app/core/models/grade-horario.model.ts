export interface GradeHorario {
  id: number;
  quadraId: number; // PK de quadra.id
  diaDaSemana: number;
  horaInicio: string;
  horaFinal: string;
  esporte?: string;
  preco?: number;
}
