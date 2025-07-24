# Letmeask Agents

Letmeask Agents é uma aplicação completa para gerenciamento de salas de perguntas e respostas em tempo real, inspirada no Letmeask. O projeto utiliza uma arquitetura monorepo, separando backend e frontend com tecnologias modernas e foco em escalabilidade, tipagem e experiência do usuário.

---

## Visão Geral

- **Monorepo:** Organização em duas aplicações principais: `server` (backend) e `web` (frontend).
- **Escalável:** Uso de TypeScript, validação forte, ORM moderno e containers.
- **Fácil de rodar:** Scripts prontos e ambiente replicável via Docker.

---

## Principais Tecnologias

### Backend (`server/`)
- **Node.js** — Ambiente de execução JavaScript
- **TypeScript** — Tipagem estática
- **Fastify** — Framework web rápido e eficiente
- **Drizzle ORM** — ORM moderno para TypeScript
- **Zod** — Validação de schemas
- **PostgreSQL** (ou SQLite) — Banco de dados relacional
- **Docker & Docker Compose** — Containerização e orquestração

### Frontend (`web/`)
- **React** — Biblioteca para construção de interfaces
- **Vite** — Bundler e servidor de desenvolvimento rápido
- **TypeScript** — Tipagem estática
- **React Router** — Gerenciamento de rotas SPA
- **TailwindCSS** — Utilitários para estilização
- **Radix UI** — Componentes acessíveis
- **Lucide React** — Ícones modernos

---

## Estrutura do Monorepo

```
letmeask-agents/
├── server/   # Backend (API REST, banco, Docker)
└── web/      # Frontend (SPA React)
```

### Backend (`server/`)
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

### Frontend (`web/`)
```
web/
├── public/                      # Arquivos estáticos
└── src/
    ├── app.tsx                  # Componente raiz, define rotas/providers
    ├── main.tsx                 # Bootstrap da aplicação React
    ├── components/              # Componentes reutilizáveis e UI
    ├── pages/                   # Páginas principais (criação de sala, sala)
    └── lib/                     # Funções utilitárias
```

---

## Arquitetura

- **API REST**: Backend expõe endpoints para gerenciamento de salas, perguntas, etc., com validação de dados via Zod e acesso a banco via Drizzle ORM.
- **Frontend SPA**: Interface modular, roteamento com React Router, UI moderna e responsiva com TailwindCSS e Radix UI.
- **Banco de dados**: Versionado por migrações SQL, scripts de setup e schemas fortemente tipados.
- **Ambiente**: Replicável via Docker, facilitando desenvolvimento e deploy.

---

## Para conseguir rodar o projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/yuriburk/letmeask-agents.git
   cd letmeask-agents
   ```

2. **Instale as dependências:**
   ```sh
   cd server && npm install
   cd ../web && npm install
   cd ..
   ```

3. **Configure variáveis de ambiente:**
   - Copie e ajuste os arquivos `.env.example` (se existirem) em `server/` e/ou `web/` para `.env` conforme necessário.

4. **Execute o backend:**
   Você pode rodar o backend de duas formas:
   - **Com Docker (recomendado):**
     ```sh
     cd server
     docker-compose up --build
     ```
   - **Localmente:**
     ```sh
     cd server
     npm run dev
     ```

5. **Execute o frontend:**
   Em outro terminal:
   ```sh
   cd web
   npm run dev
   ```

---

## Licença

MIT