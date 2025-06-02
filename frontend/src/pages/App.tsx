import React from 'react';
import AlunoList from '../components/AlunoList';
import ComoExecutar from '../components/ComoExecutar';
import '../styles/global.scss';

const App: React.FC = () => {
  return (
    <>
      <header>
        <h1>Sistema de Gerenciamento Escolar Infantil - Backend</h1>
        <p>Organização, clareza e eficiência no gerenciamento escolar.</p>
      </header>
      <nav>
        <a href="#sobre">Sobre o Projeto</a>
        <a href="#estrutura">Estrutura do Repositório</a>
        <a href="#documentacao">Documentação Técnica</a>
        <a href="#execucao">Como Executar (Docker)</a>
        <a href="#rotas">Rotas da API</a>
      </nav>
      <main className="container">
        <section id="sobre" className="section-card">
          <h2>Sobre o Projeto</h2>
          <p>Este sistema visa facilitar o gerenciamento escolar infantil, oferecendo backend robusto, documentação clara e integração via API RESTful.</p>
        </section>
        <section id="estrutura" className="section-card">
          <h2>Estrutura do Repositório</h2>
          <div className="code-block">
            <pre>{`
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
`}</pre>
          </div>
        </section>
        <section id="documentacao" className="section-card">
          <h2>Documentação Técnica</h2>
          <ul>
            <li>MER: <span role="img" aria-label="diagrama">🗂️</span> <i>Adicione o diagrama na pasta Docs/</i></li>
            <li>DFD: <span role="img" aria-label="fluxo">🔄</span> <i>Adicione o diagrama na pasta Docs/</i></li>
          </ul>
        </section>
        <section id="execucao" className="section-card">
          <ComoExecutar />
        </section>
        <section id="rotas" className="section-card">
          <h2>Rotas da API</h2>
          <table className="api-table">
            <thead>
              <tr>
                <th>Método</th>
                <th>Endpoint</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GET</td>
                <td>/alunos</td>
                <td>Lista todos os alunos</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/alunos</td>
                <td>Cria um novo aluno</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/turmas</td>
                <td>Lista todas as turmas</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="section-card">
          <AlunoList />
        </section>
      </main>
    </>
  );
};

export default App;
