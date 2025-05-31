const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/', alunoController.listarAlunos);
router.post('/', alunoController.criarAluno);
// Adicione outras rotas conforme necessário

module.exports = router;
