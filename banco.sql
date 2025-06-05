-- DDL do MER para Sistema de Gerenciamento Escolar Infantil
-- Exemplo básico com as entidades principais: aluno, turma e professor

CREATE TABLE turma (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE professor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE aluno (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    numero VARCHAR(20),
    email VARCHAR(120),
    cidade VARCHAR(80),
    bairro VARCHAR(80),
    cep VARCHAR(12),
    numero_responsavel VARCHAR(20),
    turma_id INTEGER REFERENCES turma(id)
);

-- Tabela de relacionamento caso queira associar professor a turma
CREATE TABLE professor_turma (
    id SERIAL PRIMARY KEY,
    professor_id INTEGER REFERENCES professor(id),
    turma_id INTEGER REFERENCES turma(id)
);

-- Adicione outras entidades conforme o MER do seu grupo (ex: responsável, matrícula, etc.)
