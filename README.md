# Sistema de Gerenciamento Escolar Infantil

## Visão Geral
Sistema completo para gerenciamento de alunos, turmas e professores de uma escola infantil. Inclui backend (Node.js/Express), frontend (React + TypeScript + Vite), banco de dados PostgreSQL e infraestrutura Docker.

---

## Estrutura do Projeto

- **APP/**: Backend Node.js/Express (rotas, controllers, models)
- **frontend/**: Frontend React + TypeScript + Vite + Sass
- **Docs/**: Documentação visual (MER, DFD, prints)
- **banco.sql**: Script DDL do banco de dados (referência)
- **Dockerfile, Dockerfile.db, docker-compose.yml, nginx.conf**: Infraestrutura Docker e proxy reverso
- **start-tudo.ps1**: Script único para subir todo o ambiente (backend, banco, frontend)
- **README.md**: Documentação detalhada do projeto

---

## Inicialização Completa do Projeto

### 1. Pré-requisitos
- Docker e Docker Compose instalados ([Download Docker Desktop](https://www.docker.com/products/docker-desktop/))
- Windows PowerShell (recomendado para rodar o script único)
- Node.js (apenas se for rodar o frontend fora do Docker)

### 2. Subindo TUDO com um único comando (recomendado)

Abra o PowerShell na raiz do projeto e execute:

```powershell
./start-tudo.ps1
```

Esse script irá:
- Derrubar containers antigos e volumes
- Subir backend, banco de dados e nginx
- Rodar as migrations e seeds automaticamente
- Subir o frontend (Vite) em uma nova janela

Acesse o frontend em: [http://localhost:5173](http://localhost:5173)
Acesse a API backend em: [http://localhost:3000](http://localhost:3000)

### 3. Subindo manualmente (opcional)

```powershell
# (1) Construa as imagens Docker
./docker-compose build

# (2) Suba os containers
./docker-compose up -d --build

# (3) Rode as migrations
./docker-compose exec backend node run-migrations.js

# (4) Rode os seeds
./docker-compose exec backend node run-seeds.js

# (5) Suba o frontend
cd frontend
npm install
npm run dev
```

---

## Endpoints e Acesso ao Banco

- **API de alunos:** [http://localhost:3000/alunos](http://localhost:3000/alunos)
- **API de professores:** [http://localhost:3000/professores](http://localhost:3000/professores)
- **API de turmas:** [http://localhost:3000/turmas](http://localhost:3000/turmas)

### Estrutura das principais tabelas criadas via migrations:

- **responsaveis**: Dados dos responsáveis pelos alunos (id, nome, parentesco, telefone, email, endereço)
- **alunos**: Dados dos alunos (id, nome, data_nascimento, cpf, rg, sexo, endereço, email, telefone, responsavel_id)
- **turmas**: Turmas da escola (id, nome, ano_letivo, turno, nivel_ensino)
- **professores**: Professores cadastrados (id, nome, formação, email, telefone)
- **disciplinas**: Disciplinas oferecidas (id, nome, carga_horaria, ano_serie)
- **professor_turma**: Relacionamento entre professores e turmas (id, professor_id, turma_id)
- **professores_disciplinas**: Relacionamento entre professores, disciplinas e turmas (chave composta: professor_id, disciplina_id, turma_id)
- **usuarios**: Usuários do sistema (id, nome, email, senha_hash, tipo_usuario)
- **mensalidades**: Mensalidades dos alunos (id, aluno_id, referencia_mes, valor, status, data_vencimento, data_pagamento)
- **livros**: Livros da biblioteca (id, titulo, autor, editora, ano, isbn, quantidade_total, quantidade_disponivel)
- **emprestimos**: Empréstimos de livros (id, livro_id, aluno_id, data_emprestimo, data_devolucao, status)
- **eventos**: Eventos escolares (id, titulo, descricao, data_inicio, data_fim, tipo_evento)
- **calendario_letivo**: Datas do calendário escolar (id, data, descricao, letivo)
- **avisos**: Avisos enviados (id, titulo, mensagem, destinatario_tipo, data_envio, autor_id)
- **ocorrencias**: Ocorrências disciplinares (id, aluno_id, descricao, tipo_ocorrencia, data, professor_id)

- **Banco de dados PostgreSQL:**
  - Host: `localhost`
  - Porta: `5432`
  - Usuário: `admin`
  - Senha: `admin`
  - Banco: `escola`

Você pode acessar o banco via DBeaver, TablePlus, ou outro cliente PostgreSQL para visualizar todas as tabelas e seus dados.

---

## Observações
- O banco de dados é criado via migrations, não pelo banco.sql diretamente.
- Os dados iniciais são inseridos automaticamente via seeds.
- O frontend consome a API do backend para exibir e cadastrar dados.

---


