const pool = require('../config/pg');

exports.handle = async (poolArg) => {
  const poolToUse = poolArg || pool;
  try {
    console.log('Populando tabela turma...');
    await poolToUse.query("INSERT INTO turma (nome) VALUES ($1), ($2) ON CONFLICT DO NOTHING", ['Pré 1', 'Pré 2']);
    console.log('Populando tabela professor...');
    await poolToUse.query("INSERT INTO professor (nome) VALUES ($1), ($2) ON CONFLICT DO NOTHING", ['Maria', 'Carlos']);
    console.log('Seed concluído!');
  } catch (err) {
    console.error('Erro ao rodar seed:', err);
  }
};
