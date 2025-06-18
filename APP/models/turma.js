const express = require('express');
const router = express.Router();
const Turma = require('../models/turma'); // ajuste o caminho conforme seu projeto

// Dados simulados (mock)
const turmas = [
  new Turma(1, '1º Ano A'),
  new Turma(2, '1º Ano B'),
  new Turma(3, '2º Ano A'),
];

// GET /turmas
router.get('/turmas', (req, res) => {
  res.json(turmas); // retorna um array de turmas
});

module.exports = router;
