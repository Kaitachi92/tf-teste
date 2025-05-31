const express = require('express');
const app = express();
app.use(express.json());

// Rotas
const alunoRoutes = require('./routes/alunoRoutes');
app.use('/alunos', alunoRoutes);

// Outras rotas podem ser adicionadas aqui

app.get('/', (req, res) => res.json({ status: 'API rodando!' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
