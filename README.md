# Sistema de Gerenciamento Escolar Infantil

## Objetivo
Backend para gerenciamento escolar infantil, incluindo rotas de API, controladores e models conforme o MER. Estrutura pronta para Docker e documentação.

## Estrutura de Pastas
```
/ (raiz)
├── APP/                # Backend: rotas, controladores, models
│   ├── controllers/    # Lógica das rotas (ex: alunoController.js)
│   ├── models/         # Modelos das entidades do MER (ex: aluno.js)
│   ├── routes/         # Definição das rotas REST (ex: alunoRoutes.js)
│   └── app.js          # Arquivo principal do backend
├── Docs/               # Documentação técnica (MER, DFD)
├── banco.sql           # Script DDL do banco de dados
├── Dockerfile          # Backend
├── Dockerfile.db       # Banco de dados
├── docker-compose.yml  # Orquestração
├── nginx.conf          # Proxy reverso
└── README.md           # Documentação
```

### Detalhes da pasta APP
- **controllers/**: Funções que processam as requisições das rotas.
- **models/**: Representação das entidades do banco (ex: Aluno, Turma, Professor).
- **routes/**: Arquivos que definem as rotas da API (ex: /alunos, /turmas).
- **app.js**: Ponto de entrada da aplicação Express.

## Docker e Orquestração

- **Dockerfile**: Cria a imagem do backend Node.js, instala dependências e expõe a porta 3000.
- **Dockerfile.db**: Cria a imagem do banco de dados PostgreSQL, inicializando com o script banco.sql.
- **nginx.conf**: Configura o nginx como proxy reverso, encaminhando as requisições para o backend.
- **docker-compose.yml**: Orquestra os serviços (backend, banco de dados e nginx), define redes, volumes e dependências.

## Como executar com Docker

1. Construa as imagens:
   ```powershell
   docker-compose build
   ```
2. Suba os containers:
   ```powershell
   docker-compose up
   ```

- O backend estará acessível via nginx em: http://localhost
- O banco de dados estará disponível na porta 5432 (PostgreSQL).

## Como interagir com as rotas de API

Exemplos de endpoints:
- `GET /alunos` — Lista todos os alunos
- `POST /alunos` — Cria um novo aluno
- `GET /turmas` — Lista todas as turmas

Exemplo de requisição com curl:
```sh
curl -X GET http://localhost/alunos
```

## Adicione os diagramas MER e DFD na pasta Docs/.

## Dicas e Troubleshooting
- Certifique-se de que as portas 80 (nginx), 3000 (backend) e 5432 (db) estejam livres.
- Para reiniciar o ambiente limpo:
  ```powershell
  docker-compose down -v
  docker-compose up --build
  ```
- Logs do backend: `docker-compose logs backend`
- Logs do banco: `docker-compose logs db`

---
Preencha o banco.sql com o DDL do seu MER.
