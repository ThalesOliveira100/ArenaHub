import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'iniciais',
  standalone: true
})
export class IniciaisPipe implements PipeTransform {
  transform(nome: string | undefined | null) {
    if (!nome) {
      return '--';
    };

    const partesDoNome = nome.trim().split(/\s+/);

    if (partesDoNome.length === 1) {
      return partesDoNome[0].substring(0, 2).toUpperCase();
    };

    const primeiraLetra = partesDoNome[0][0];
    const ultimaLetra = partesDoNome[partesDoNome.length - 1][0];

    return (primeiraLetra + ultimaLetra).toUpperCase();
  }
}
