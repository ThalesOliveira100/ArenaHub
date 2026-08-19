import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaSemana'
})
export class DiaSemanaPipe implements PipeTransform {
  private readonly dias = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];

  transform(value: number | undefined | null): string {
    if (value === undefined || value === null || value < 0 || value > 6) {
      return '';
    }
    return this.dias[value];
  }
}
