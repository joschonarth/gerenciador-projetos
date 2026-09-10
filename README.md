<div align="center">

<img alt="gerenciador-projetos" src="/frontend/public/favicon.ico" />

# 📋 Gerenciador de Projetos

_Sistema de gestão de projetos e tarefas com autenticação, níveis de acesso, quadro Kanban, backlog e área administrativa com logs de auditoria._

<img src="https://img.shields.io/github/last-commit/joschonarth/gerenciador-projetos?style=default&logo=git&logoColor=white&color=6366f1&labelColor=27272a" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/joschonarth/gerenciador-projetos?style=default&color=6366f1&labelColor=27272a" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/joschonarth/gerenciador-projetos?style=default&color=6366f1&labelColor=27272a" alt="repo-language-count">

---

📃 [Sobre](#-sobre)&nbsp;&nbsp;•&nbsp;&nbsp;
🛠️ [Tecnologias](#️-tecnologias)&nbsp;&nbsp;•&nbsp;&nbsp;
✨ [Funcionalidades](#-funcionalidades)&nbsp;&nbsp;•&nbsp;&nbsp;
🧪 [Testes Unitários](#-testes-unitários)&nbsp;&nbsp;•&nbsp;&nbsp;
🚀 [Como rodar](#-como-rodar)&nbsp;&nbsp;

</div>

---

<img width="1365" height="767" alt="board" src="https://github.com/user-attachments/assets/411b89f2-eb0a-47c4-bc13-fdf81b0a5869" />

---

## 📃 Sobre

O **Gerenciador de Projetos** é um sistema para planejamento, acompanhamento e gestão de projetos e tarefas em equipes de desenvolvimento, com **frontend em Angular** e **backend em Node.js e Express**, organizados no mesmo repositório. A aplicação conta com autenticação e níveis de permissão diferenciados entre administradores e membros, dashboard com visão geral dos projetos, quadro Kanban para acompanhamento de tarefas, gerenciamento de backlog, configurações de perfil e faturamento, além de uma área administrativa com logs de auditoria das ações realizadas na plataforma.

---

## 🛠️ Tecnologias

### Frontend

- 🅰️ **[Angular](https://angular.dev/)** — Framework para construção de aplicações web robustas e escaláveis, utilizando componentes standalone e Signals.
- 🟦 **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática e segurança em tempo de desenvolvimento.
- 🎨 **[TailwindCSS](https://tailwindcss.com/)** — Framework CSS utility-first para estilização e responsividade.
- 🔄 **[RxJS](https://rxjs.dev/)** — Programação reativa com observables para gerenciamento de estado e eventos.
- 🧪 **[Vitest](https://vitest.dev/)** — Executor de testes integrado ao builder de testes do Angular CLI, utilizado para os testes unitários do frontend.

### Backend

- 🟩 **[Node.js](https://nodejs.org/)** — Ambiente de execução JavaScript no servidor.
- 🟦 **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática também no backend.
- 🚂 **[Express](https://expressjs.com/)** — Framework para construção da API REST.
- ⚡ **[tsx](https://github.com/privatenumber/tsx)** — Execução de TypeScript sem etapa manual de compilação durante o desenvolvimento.

---

## ✨ Funcionalidades

- [x] 🔐 Autenticação com interceptores HTTP para tratamento de sessão e erros
- [x] 🛡️ Controle de acesso por perfil (`admin` e `member`) via guards e diretivas
- [x] 📈 Dashboard com visão geral dos projetos e atividades
- [x] 📋 Criação, edição e exclusão de projetos, com tela de configurações individuais
- [x] 🗂️ Gerenciamento de backlog com priorização, responsáveis e filtros de busca
- [x] 📊 Quadro Kanban para movimentação de tarefas entre status (A Fazer, Em Progresso, Concluído)
- [x] 📝 Tela de detalhes da tarefa com descrição, responsável, prioridade e prazo
- [x] 🕵️ Logs de auditoria para administradores, com histórico de ações por usuário
- [x] ⚙️ Configurações de perfil e faturamento (billing)
- [x] ⏳ Indicador de carregamento global sincronizado com rotas e chamadas à API

---

## 🚀 Como rodar

### 📋 Pré-requisitos

- 🟩 [Node.js 24.15.0+](https://nodejs.org/)
- 🅰️ [Angular CLI 22+](https://angular.dev/tools/cli)

### 🔧 Instalação e Execução

O projeto é dividido em duas pastas, `backend` e `frontend`, que devem ser executadas em terminais separados.

#### 🟩 Backend (Node.js)

1. Acesse a pasta do backend:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm run dev
   ```

4. 👉 O servidor estará disponível em **[http://localhost:3000](http://localhost:3000)**.

#### 🅰️ Frontend (Angular)

1. Acesse a pasta do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie a aplicação:

   ```bash
   npm run start
   ```

4. 👉 A aplicação estará disponível em **[http://localhost:4200](http://localhost:4200)**.

---

## 🧪 Testes Unitários

O frontend possui uma suíte de testes unitários (`.spec.ts`) integrada nativamente ao Angular CLI através do builder `@angular/build:unit-test`, que utiliza o **Vitest** para execução dos testes.

### 📂 Escopo de testagem

- **Guards de rota** — validação de autenticação e restrição de acesso por perfil (`auth-guard`, `role-guard`).
- **Prevenção de perda de dados** — alerta ao usuário antes de sair de uma página com alterações não salvas (`unsaved-changes-guard`).
- **Interceptores HTTP** — injeção de token JWT e tratamento de erros de API (`auth-interceptor`, `error-interceptor`).
- **Resolvers** — pré-carregamento de dados antes da conclusão das rotas (`project-resolver`, `task-resolver`, `users-resolver`).
- **Telas e componentes** — comportamento de fluxos principais (`dashboard`, `board`, `login`, `task-detail`).
- **Utilitários e UI** — pipes e diretivas de suporte (`initials-pipe`, `has-role-directive`, `loading-bar`).

### ⚙️ Como executar os testes

1. Acesse a pasta do frontend:

   ```bash
   cd frontend
   ```

2. Execute a suíte de testes:

   ```bash
   npm run test
   ```

Por padrão, os testes rodam em modo watch, reexecutando automaticamente a cada alteração de arquivo.

---

## ⭐ Apoie este Projeto

Se curtiu o projeto, deixe uma ⭐ aqui no GitHub — isso ajuda muito!

---

<div align="center">

Feito com ♥ por **[João Otávio Schonarth](https://github.com/joschonarth)**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/joschonarth)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/joschonarth)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joschonarth@gmail.com)

</div>
