export interface RelatorioConsumo {
  id: number;
  quadraId: number; // FK de quadra.id
  ano: number;
  mes: number;
  energiaKwh: number;
  aguaM3: number;
  ocupacaoPercentual: number;
}
