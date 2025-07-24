# Letmeask Agents

Este projeto é uma aplicação web construída com React e Vite, inspirada no Letmeask, para gerenciamento de salas de perguntas e respostas em tempo real.

## Funcionalidades
- Criação de salas
- Acesso a salas por id
- Interface moderna e responsiva



## Tecnologias Utilizadas
- [React](https://react.dev/) — Biblioteca para construção de interfaces
- [Vite](https://vitejs.dev/) — Bundler e servidor de desenvolvimento rápido
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática para JavaScript
- [React Router](https://reactrouter.com/) — Gerenciamento de rotas

## Bibliotecas
Principais bibliotecas utilizadas no projeto:

- **react**: Base para construção da interface de usuário.
- **react-dom**: Integração do React com a árvore DOM do navegador.
- **react-router-dom**: Gerenciamento de rotas SPA.
- **vite**: Ferramenta de build e servidor de desenvolvimento.
- **typescript**: Superset do JavaScript para tipagem estática.

Consulte o arquivo `package.json` para a lista completa de dependências e versões.

## Arquitetura
O projeto segue uma arquitetura modular baseada em componentes e páginas:

- **src/components/**: Componentes reutilizáveis e UI (ex: botões, inputs)
- **src/pages/**: Páginas principais da aplicação (ex: criação de sala, sala)
- **src/lib/**: Funções utilitárias e helpers
- **src/app.tsx**: Componente raiz, responsável por definir rotas e providers globais
- **src/main.tsx**: Ponto de entrada da aplicação, faz o bootstrap do React

O roteamento é feito com React Router, permitindo navegação entre páginas sem recarregar a aplicação. O Vite é utilizado para desenvolvimento rápido e build otimizada.

## Estrutura do Projeto
```
public/           # Arquivos estáticos
src/
  app.tsx         # Componente principal e rotas
  main.tsx        # Ponto de entrada
  components/     # Componentes reutilizáveis
    ui/           # Componentes de interface
  pages/          # Páginas principais
  lib/            # Utilitários
```

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse `http://localhost:5173` no navegador.

## Scripts Disponíveis
- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera a versão de produção
- `npm run preview` — Visualiza a build de produção localmente

## Requisitos
- Node.js >= 18
- npm >= 9

## Licença

Este projeto está sob a licença MIT.
