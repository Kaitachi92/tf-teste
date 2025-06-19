const express = require('express');
const router = express.Router();
const Turma = require('../models/turma');

const turmas = [
  new Turma(1, '1º Ano A'),
  new Turma(2, '1º Ano B'),
  new Turma(3, '2º Ano A'),
];

router.get('/', (req, res) => {
  res.json(turmas);
});

module.exports = router;
