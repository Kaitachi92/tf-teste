// CRUD de Turmas (simples, em memória)
let turmas = [
  { id: 1, nome: 'Pré I' }
];
let nextId = 2;

exports.listarTurmas = (req, res) => {
  res.json(turmas);
};

exports.criarTurma = (req, res) => {
  const { nome } = req.body;
  if (!nome || typeof nome !== 'string') {
    return res.status(400).json({ erro: 'Nome é obrigatório.' });
  }
  const novaTurma = { id: nextId++, nome };
  turmas.push(novaTurma);
  res.status(201).json(novaTurma);
};

exports.buscarTurma = (req, res) => {
  const id = parseInt(req.params.id);
  const turma = turmas.find(t => t.id === id);
  if (!turma) return res.status(404).json({ erro: 'Turma não encontrada.' });
  res.json(turma);
};

exports.atualizarTurma = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome } = req.body;
  const turma = turmas.find(t => t.id === id);
  if (!turma) return res.status(404).json({ erro: 'Turma não encontrada.' });
  if (!nome || typeof nome !== 'string') {
    return res.status(400).json({ erro: 'Nome é obrigatório.' });
  }
  turma.nome = nome;
  res.json(turma);
};

exports.deletarTurma = (req, res) => {
  const id = parseInt(req.params.id);
  const index = turmas.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Turma não encontrada.' });
  turmas.splice(index, 1);
  res.status(204).send();
};
