import React, { useEffect, useState } from 'react';
import './AlunoList.scss';

type Professor = { id: number; nome: string; turma_id?: number };
type Turma = { id: number; nome: string };

type ProfessorTurma = { professor_id: number; turma_id: number };

const ProfessorList: React.FC = () => {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [nome, setNome] = useState('');
  const [turmaId, setTurmaId] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  // Simulação: não há endpoint de professor_turma, então só mostra o nome da turma vinculada no cadastro
  useEffect(() => {
    fetch('/professores').then(res => res.json()).then(setProfessores);
    fetch('/turmas').then(res => res.json()).then(setTurmas);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !turmaId) return;
    setLoading(true);
    // Simula o vínculo professor-turma apenas no frontend
    await fetch('/professores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, turma_id: turmaId })
    });
    setNome('');
    setTurmaId('');
    fetch('/professores').then(res => res.json()).then(setProfessores);
    setLoading(false);
  };

  return (
    <div className="aluno-list">
      <h2>Cadastro de Professores</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Nome do professor"
          style={{ flex: 1, borderRadius: 8, border: '1px solid #ccc', padding: 8 }}
        />
        <select
          value={turmaId}
          onChange={e => setTurmaId(Number(e.target.value))}
          style={{ borderRadius: 8, border: '1px solid #ccc', padding: 8 }}
        >
          <option value="">Selecione a turma</option>
          {turmas.map(turma => (
            <option key={turma.id} value={turma.id}>{turma.nome}</option>
          ))}
        </select>
        <button className="btn-pill" type="submit">adicionar</button>
      </form>
      {/* Lista de professores */}
      <ul>
        {professores.map(prof => (
          <li key={prof.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ flex: 1 }}>{prof.nome}</span>
            <span style={{ color: '#888', fontSize: 13 }}>
              {turmas.find(t => t.id === prof.turma_id)?.nome || '-'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessorList;
