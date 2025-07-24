# Letmeask Agents - Server

Este projeto é o backend do Letmeask Agents, uma aplicação para gerenciamento de salas de perguntas e respostas em tempo real.

## Principais Tecnologias e Bibliotecas

- **Node.js**
- **TypeScript**
- **Fastify** — Framework web rápido e eficiente
- **Zod** — Validação de schemas
- **Drizzle ORM** — ORM para TypeScript
- **SQLite** — Banco de dados relacional (pode ser substituído por outros via Drizzle)
- **Docker** — Containerização do ambiente

## Estrutura de Pastas

```
server/
├── src/
│   ├── db/
│   │   ├── connection.ts         # Conexão com o banco de dados
│   │   ├── schema/              # Schemas do banco (Drizzle)
│   │   ├── migrations/          # Migrações SQL
│   │   └── http/routes/         # Rotas HTTP (Fastify)
│   ├── env.ts                   # Configurações de ambiente
│   └── server.ts                # Inicialização do servidor Fastify
├── docker/
│   └── setup.sql                # Script de setup do banco
├── docker-compose.yml           # Orquestração de containers
├── drizzle.config.ts            # Configuração do Drizzle ORM
├── package.json                 # Dependências e scripts
└── tsconfig.json                # Configuração do TypeScript
```

## Arquitetura

- **API REST** construída com Fastify, utilizando validação de dados com Zod.
- **Acesso a dados** via Drizzle ORM, com schemas fortemente tipados em TypeScript.
- **Banco de dados** versionado por migrações SQL e scripts de setup.
- **Ambiente** facilmente replicável via Docker e Docker Compose.

## Como rodar o projeto

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Configure as variáveis de ambiente (verifique o arquivo `env.ts`).
3. Execute as migrações e inicialize o banco:
   ```sh
   docker-compose up -d
   # ou
   npm run db:migrate
   ```
4. Inicie o servidor:
   ```sh
   npm run dev
   ```
5. Para gerar o build de produção:
   ```sh
   npm run build
   ```
