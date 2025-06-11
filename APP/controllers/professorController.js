const pool = require('../config/pg');

function validarNome(nome) {
  return nome && typeof nome === 'string';
}
function validarTurmaId(turma_id) {
  return typeof turma_id === 'number' && !isNaN(turma_id);
}

// Listar todos os professores com as turmas vinculadas (N:N)
exports.listarProfessores = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.nome, array_agg(pt.turma_id) AS turmas
      FROM professor p
      LEFT JOIN professor_turma pt ON pt.professor_id = p.id
      GROUP BY p.id
      ORDER BY p.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar professores.' });
  }
};

// Criar professor e vincular a turma (N:N)
exports.criarProfessor = async (req, res) => {
  const { nome, turma_id } = req.body;
  if (!validarNome(nome)) {
    return res.status(400).json({ erro: 'Nome é obrigatório.' });
  }
  if (!validarTurmaId(turma_id)) {
    return res.status(400).json({ erro: 'Turma é obrigatória.' });
  }
  try {
    // Cria o professor
    const profResult = await pool.query(
      'INSERT INTO professor (nome) VALUES ($1) RETURNING *',
      [nome]
    );
    const professor = profResult.rows[0];
    // Cria o vínculo
    await pool.query(
      'INSERT INTO professor_turma (professor_id, turma_id) VALUES ($1, $2)',
      [professor.id, turma_id]
    );
    return res.status(201).json(professor);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar professor.' });
  }
};

// Buscar professor (com turmas)
exports.buscarProfessor = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      `SELECT p.id, p.nome, array_agg(pt.turma_id) AS turmas
       FROM professor p
       LEFT JOIN professor_turma pt ON pt.professor_id = p.id
       WHERE p.id = $1
       GROUP BY p.id`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Professor não encontrado.' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar professor.' });
  }
};

// Atualizar professor (nome e vínculo de turma)
exports.atualizarProfessor = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, turma_id } = req.body;
  if (!validarNome(nome)) {
    return res.status(400).json({ erro: 'Nome é obrigatório.' });
  }
  if (!validarTurmaId(turma_id)) {
    return res.status(400).json({ erro: 'Turma é obrigatória.' });
  }
  try {
    // Atualiza nome
    const result = await pool.query('UPDATE professor SET nome = $1 WHERE id = $2 RETURNING *', [nome, id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Professor não encontrado.' });
    // Atualiza vínculo (remove todos e adiciona o novo)
    await pool.query('DELETE FROM professor_turma WHERE professor_id = $1', [id]);
    await pool.query('INSERT INTO professor_turma (professor_id, turma_id) VALUES ($1, $2)', [id, turma_id]);
    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao atualizar professor.' });
  }
};

// Deletar professor e vínculos
exports.deletarProfessor = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM professor_turma WHERE professor_id = $1', [id]);
    const result = await pool.query('DELETE FROM professor WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Professor não encontrado.' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar professor.' });
  }
};
