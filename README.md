# Sistema de Gerenciamento Escolar Infantil

## Visão Geral
Sistema completo para gerenciamento de alunos, turmas e professores de uma escola infantil. Inclui backend (Node.js/Express), frontend (React + TypeScript + Vite), banco de dados PostgreSQL e infraestrutura Docker.

---

## Estrutura do Projeto

- **APP/**: Backend Node.js/Express (rotas, controllers, models)
- **frontend/**: Frontend React + TypeScript + Vite + Sass
- **Docs/**: Documentação visual (MER, DFD, prints)
- **banco.sql**: Script DDL do banco de dados
- **Dockerfile, Dockerfile.db, docker-compose.yml, nginx.conf**: Infraestrutura Docker e proxy reverso
- **README.md**: Documentação detalhada do projeto

---

## Inicialização Completa do Projeto

### 1. Pré-requisitos
- Docker e Docker Compose instalados ([Download Docker Desktop](https://www.docker.com/products/docker-desktop/))
- Node.js (apenas se for rodar o frontend fora do Docker)

### 2. Subindo Backend, Banco de Dados e Proxy (Docker)

Abra o PowerShell na raiz do projeto e execute:

```powershell
# (1) Construa as imagens Docker
./docker-compose build

# (2) Suba os containers
./docker-compose up
```

- O backend estará acessível via nginx em: http://localhost
- O banco de dados estará disponível na porta 5432 (PostgreSQL)
- O backend Node.js estará na porta 3000 (internamente)

### 3. Executando o Frontend

Abra um novo terminal e execute:

```powershell
cd frontend
npm install
npm run dev
```

- O frontend estará disponível em: http://localhost:5173
- O proxy do Vite já está configurado para encaminhar as requisições para o backend (porta 3000)

### 4. Fluxo Completo de Inicialização

1. Execute `./docker-compose build` para garantir que todas as imagens estejam atualizadas.
2. Execute `./docker-compose up` para subir backend, banco e nginx.
3. Em outro terminal, rode o frontend com `npm run dev` dentro da pasta `frontend`.
4. Acesse http://localhost:5173 para usar o sistema.

---

## Exemplos de Endpoints da API

- `GET /alunos` — Lista todos os alunos
- `POST /alunos` — Cria um novo aluno
- `GET /turmas` — Lista todas as turmas
- `POST /turmas` — Cria uma nova turma
- `GET /professores` — Lista todos os professores
- `POST /professores` — Cria um novo professor

Veja mais exemplos e detalhes no código e na documentação.

---

## Troubleshooting e Dicas

- Para reiniciar o ambiente limpo:
  ```powershell
  ./docker-compose down -v
  ./docker-compose up --build
  ```
- Para visualizar logs do backend:
  ```powershell
  ./docker-compose logs backend
  ```
- Para visualizar logs do banco de dados:
  ```powershell
  ./docker-compose logs db
  ```
- Certifique-se de que as portas 80 (nginx), 3000 (backend) e 5432 (db) estejam livres.
- Se o frontend não conectar ao backend, verifique se ambos estão rodando e se o proxy do Vite está ativo.

---

## Observações Finais
- Preencha o banco.sql com o DDL do seu MER.
- Adicione diagramas MER e DFD na pasta Docs/.
- Para dúvidas ou problemas, consulte os logs dos containers ou peça ajuda ao time.
