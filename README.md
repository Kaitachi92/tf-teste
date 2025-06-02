# Sistema de Gerenciamento Escolar Infantil

## Detalhes do Projeto (conforme solicitado via formulário)

### Objetivo Geral
Desenvolver um sistema completo para o gerenciamento de alunos de uma escola infantil, contemplando backend, frontend, documentação e infraestrutura Docker, conforme as exigências acadêmicas.

---

### Funcionalidades e Requisitos Atendidos

- **CRUD Completo de Alunos:**
  - Cadastro, listagem, edição, busca e remoção de alunos via API REST e interface web.
  - Todas as operações testadas e integradas.

- **Frontend Profissional:**
  - Desenvolvido em React + TypeScript + Vite + Sass (SCSS).
  - Visual moderno, responsivo, com diferenciação clara dos botões (azul para adicionar/salvar, verde para editar, vermelho para remover), gradientes e sombras.
  - Proxy do Vite configurado para integração transparente com o backend (porta 3000).
  - Componentes organizados e integração total com a API.

- **Backend Estruturado:**
  - Node.js/Express, arquitetura MVC (controllers, models, routes).
  - Rotas RESTful para alunos (CRUD completo), respostas em JSON.
  - Middleware global de tratamento de erros.
  - Dados em memória, mas estrutura pronta para integração com banco relacional.

- **Banco de Dados:**
  - Script DDL (`banco.sql`) com tabelas principais: aluno, turma, professor, professor_turma.
  - Pronto para ser preenchido conforme o MER do grupo.
  - Para visualizar as tabelas no banco de dados, utilize o comando `\dt`.

- **Infraestrutura Docker:**
  - Dockerfile para backend e banco de dados.
  - docker-compose.yml para orquestração dos serviços.
  - nginx.conf para proxy reverso.

- **Documentação Completa:**
  - README detalhado com instruções de uso, exemplos de rotas, troubleshooting, checklist de entrega, estrutura de pastas e orientações para a banca.
  - Espaço reservado para inclusão dos diagramas MER e DFD na pasta Docs/ (em PDF, PNG ou JPG).

---

### Estrutura do Repositório

- **APP/**: Backend (Node.js/Express) com rotas, controllers, models e app.js.
- **frontend/**: Frontend (React + TypeScript + Vite + Sass), componentes organizados e integração total com a API.
- **Docs/**: Pasta para documentação visual (MER, DFD, prints).
- **banco.sql**: Script DDL do banco de dados.
- **Dockerfile, Dockerfile.db, docker-compose.yml, nginx.conf**: Infraestrutura Docker e proxy reverso.
- **README.md**: Documentação detalhada do projeto.

---

---


### Exemplos de Endpoints da API

- `GET /alunos` — Lista todos os alunos
- `GET /alunos/:id` — Busca um aluno pelo ID
- `POST /alunos` — Cria um novo aluno
- `PUT /alunos/:id` — Atualiza um aluno existente
- `DELETE /alunos/:id` — Remove um aluno

Exemplo de requisição com curl:
```sh
curl -X GET http://localhost/alunos
```

---

### Detalhamento da Estrutura da Pasta APP

- `controllers/`: Funções que processam as requisições das rotas (lógica de negócio)
- `models/`: Definição das entidades do sistema (ex: Aluno, Turma)
- `routes/`: Definição das rotas REST (ex: /alunos, /turmas)
- `app.js`: Ponto de entrada da aplicação Express

---

### Troubleshooting e Logs

- Para reiniciar o ambiente limpo:
  ```powershell
  docker-compose down -v
  docker-compose up --build
  ```
- Para visualizar logs do backend:
  ```powershell
  docker-compose logs backend
  ```
- Para visualizar logs do banco de dados:
  ```powershell
  docker-compose logs db
  ```

---
