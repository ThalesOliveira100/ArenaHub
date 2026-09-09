export function parseDataEHora(dataStr: string, horaStr: string): Date {
  const separador = dataStr.includes('-') ? '-' : '/';
  const [ ano, mes, dia ] = dataStr.split(separador).map(Number);
  const [ hora, minuto ] = horaStr.split(':').map(Number);

  return new Date(ano, mes - 1, dia, hora || 0, minuto || 0);
}
