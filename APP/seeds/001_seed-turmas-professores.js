const { Pool } = require('pg');

// Detecta ambiente: se rodando em Docker, usa 'db', senão 'localhost'
const isDocker = process.env.DB_HOST === 'db' || process.env.DOCKER_ENV === '1';
const host = isDocker ? 'db' : 'localhost';

// Configuração do pool de conexão (ajuste se necessário)
const pool = new Pool({
  host: process.env.DB_HOST || host,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || 'admin',
  database: process.env.DB_NAME || 'escola',
  port: 5432
});

exports.handle = async () => {
  try {
    console.log('Populando tabela turma...');
    await pool.query("INSERT INTO turma (nome) VALUES ($1), ($2) ON CONFLICT DO NOTHING", ['Pré 1', 'Pré 2']);
    console.log('Populando tabela professor...');
    await pool.query("INSERT INTO professor (nome) VALUES ($1), ($2) ON CONFLICT DO NOTHING", ['Maria', 'Carlos']);
    console.log('Seed concluído!');
  } catch (err) {
    console.error('Erro ao rodar seed:', err);
  } finally {
    await pool.end();
  }
};
