const Aluno = require('../models/aluno');

// Lista de alunos em memória (simulação)
let alunos = [
    { id: 1, nome: 'João' }
];
let nextId = 2;

exports.listarAlunos = (req, res) => {
    res.json(alunos);
};

exports.criarAluno = (req, res) => {
    const { nome } = req.body;
    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ erro: 'Nome é obrigatório.' });
    }
    const novoAluno = { id: nextId++, nome };
    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
};

exports.buscarAluno = (req, res) => {
    const id = parseInt(req.params.id);
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado.' });
    res.json(aluno);
};

exports.atualizarAluno = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado.' });
    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ erro: 'Nome é obrigatório.' });
    }
    aluno.nome = nome;
    res.json(aluno);
};

exports.deletarAluno = (req, res) => {
    const id = parseInt(req.params.id);
    const index = alunos.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Aluno não encontrado.' });
    alunos.splice(index, 1);
    res.status(204).send();
};
