import { Quadra, QuadraStatus } from "../models/quadra.model";

export const quadras: Quadra[] = [
  {
    id: 1,
    nome: 'Centro Poliesportivo de Pedro Leopoldo - CEPPEL',
    regiao: 'Pedro Leopoldo',
    endereco: 'R. Anélio Caldas, 185 - Centro',
    status: QuadraStatus.MANUTENCAO,
    esportes: ['vôlei', 'futsal', 'basquete', 'badminton', 'queimada'],
    descricao: 'O CEPPEL é um complexo poliesportivo e de lazer de aproximadamente 75 mil metros quadrados localizado em Pedro Leopoldo, Minas Gerais. O espaço tem passado por amplas reformas e revitalizações estruturais para incentivar a prática de atividades físicas, o esporte e a convivência comunitária.',
    gestorId: 1,
    monitorId: 1,
    imagemUrl: 'https://pl.mg.gov.br/wp-content/uploads/2026/07/Homem-e-preso-apos-furtar-ferramentas-de-reforma-do-CEPPEL.jpeg'
  },
  {
    id: 2,
    nome: 'PL Beach',
    regiao: 'Pedro Leopoldo',
    endereco: 'Av. Cel. Juventino Dias, 584 - CENTRO',
    status: QuadraStatus.ATIVA,
    esportes: ['futvolei', 'volei de areia'],
    descricao: 'O PL Beach Sports é um centro esporte e lazer localizado na Avenida Coronel Juventino Dias, 584, no centro de Pedro Leopoldo (MG). O espaço é dedicado à prática de esportes de areia e conta com infraestrutura voltada para o bem-estar e diversão de atletas e visitantes.',
    gestorId: 1,
    monitorId: 1
  },
  {
    id: 3,
    nome: 'Ginásio Municipal Poliesportivo Dr. Márcio Reinaldo',
    regiao: 'Matozinhos',
    endereco: 'R. João Gonçalves de Oliveira, 201 - São Pedro',
    status: QuadraStatus.ATIVA,
    esportes: ['vôlei', 'futsal', 'judô'],
    descricao: 'Ginásio Municipal Poliesportivo Dr. Márcio Reinaldo fica em Matozinhos, Minas Gerais, e serve como o principal espaço público para eventos esportivos, culturais e competições oficiais da cidade.',
    gestorId: 1,
    monitorId: 1,
    imagemUrl: 'https://cdn6.campograndenews.com.br/uploads/noticias/2020/03/10/24lrysd7ur1cc.jpg'
  },
  {
    id: 4,
    nome: 'Ginásio Poliesportivo Municipal de Confins',
    regiao: 'Confins',
    endereco: 'R. Raimunda Marques, Confins - MG',
    status: QuadraStatus.ATIVA,
    esportes: ['volei', 'futsal', 'tênis de mesa'],
    descricao: 'O Ginásio Poliesportivo Municipal de Confins é um espaço público localizado na Rua Raimunda Marques (próximo à região central de Confins, MG), destinado à prática de esportes, treinos, campeonatos locais de futsal e eventos socioculturais e comunitários do município.',
    gestorId: 1,
    monitorId: 1,
    imagemUrl: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnBlSKUPMEA8naKcmmJk0c_8lcXRwNDo1JKRAz1Yv7ItA3hLUqFtfOvHZEInLXpU-4MU-IPBLv9SNBmEtt1ERMUg6YUj3-4JFI-n3TsjJLTLkuBsPSmZWXxukadGqWRp55JPBF7NQ=s680-w680-h510-rw'
  }
]
