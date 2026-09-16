# ArenaHub

Aplicação web para consultar e administrar arenas esportivas. O projeto reúne uma área pública para descoberta de quadras e um painel autenticado para a operação diária: horários, eventos, patrimônio, solicitações, multas e relatórios de consumo.

## Funcionalidades

- Consulta pública de quadras e seus detalhes.
- Autenticação e controle de acesso por perfil (`ADMIN`, `GESTOR` e `MONITOR`).
- Gestão de quadras, grades de horário, eventos, patrimônio, solicitações e multas.
- Painel com indicadores e gráficos de ocupação e consumo.
- Relatórios de consumo por período e por quadra.

## Tecnologias

- [Angular 21](https://angular.dev/) com componentes standalone, rotas com carregamento sob demanda e Signals.
- [Angular Material](https://material.angular.dev/) para componentes de interface.
- [Chart.js](https://www.chartjs.org/) para gráficos.
- [json-server](https://github.com/typicode/json-server) para uma API REST simulada durante o desenvolvimento.
- [Vitest](https://vitest.dev/) para testes unitários.
- SCSS e Prettier para estilos e formatação.

## Pré-requisitos

- [Node.js](https://nodejs.org/) em versão LTS compatível com Angular 21.
- npm 11 (a versão definida pelo projeto).

## Como executar

1. Clone o repositório e entre na pasta do projeto.

   ```bash
   git clone https://github.com/ThalesOliveira100/ArenaHub.git
   cd ArenaHub
   ```

2. Instale as dependências usando o lockfile do projeto.

   ```bash
   npm ci
   ```

3. Em um terminal, inicie a aplicação.

   ```bash
   npm start
   ```

4. Acesse [http://localhost:4200](http://localhost:4200).

Por padrão, a aplicação está configurada para consumir a API definida nos arquivos de ambiente. Para trabalhar com os dados de exemplo locais, inicie também o servidor JSON em outro terminal:

```bash
npm run api
```

O comando usa [`db.json`](./db.json) como fonte de dados. Se desejar apontar a aplicação para esse servidor local, ajuste `apiUrl` no arquivo de ambiente para o endereço exibido pelo `json-server`.

> As contas e senhas em `db.json` existem exclusivamente como dados de demonstração. Não use esses valores em ambientes reais.

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento. |
| `npm run api` | Inicia a API REST simulada com `db.json`. |
| `npm run build` | Gera a versão otimizada para produção em `dist/`. |
| `npm run watch` | Gera builds de desenvolvimento continuamente. |
| `npm test` | Executa os testes unitários. |
| `npm run ng -- <comando>` | Executa um comando da Angular CLI, por exemplo `npm run ng -- generate component nome`. |

## Estrutura do projeto

```text
src/
├── app/
│   ├── core/        # autenticação, guardas, modelos, serviços e estado
│   ├── features/    # áreas pública, autenticação e dashboard
│   └── shared/      # componentes e pipes reutilizáveis
├── environments/    # configuração de ambiente, incluindo a URL da API
└── styles.scss      # estilos globais
public/              # imagens e demais recursos estáticos
db.json              # dados de exemplo para a API simulada
```

## Arquitetura e convenções

- Mantenha regras de negócio e acesso HTTP em `core/services`; componentes devem concentrar-se na interface e interação.
- Preserve o carregamento sob demanda das telas ao adicionar rotas.
- Reutilize os componentes em `shared` antes de criar elementos visuais duplicados.
- Não armazene segredos, credenciais reais ou URLs privadas nos arquivos de ambiente versionados.
- Antes de abrir uma alteração, execute `npm test` e `npm run build`.

## Contribuição

1. Crie uma branch com uma descrição objetiva, por exemplo `codex/ajusta-relatorio-consumo`.
2. Faça alterações pequenas e focadas.
3. Garanta que os testes e o build passam.
4. Descreva na solicitação de mudança o contexto, o que foi alterado e como validar.

## Licença

Este projeto é distribuído sob a [GNU Affero General Public License v3.0](./LICENSE).
