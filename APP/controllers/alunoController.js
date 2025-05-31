const Aluno = require('../models/aluno');

exports.listarAlunos = (req, res) => {
    // Exemplo: retorna lista mockada
    res.json([{ id: 1, nome: 'João' }]);
};

exports.criarAluno = (req, res) => {
    // Exemplo: retorna aluno criado
    res.status(201).json({ id: 2, ...req.body });
};
