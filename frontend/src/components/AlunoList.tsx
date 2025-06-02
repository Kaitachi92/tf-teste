import React, { useEffect, useState } from 'react';
import './AlunoList.scss';

type Aluno = {
  id: number;
  nome: string;
};

const AlunoList: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editNome, setEditNome] = useState('');

  const fetchAlunos = () => {
    setLoading(true);
    fetch('/alunos')
      .then(res => res.json())
      .then(data => setAlunos(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;
    setLoading(true);
    await fetch('/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome })
    });
    setNome('');
    // Após adicionar, buscar a lista atualizada do backend
    fetchAlunos();
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    await fetch(`/alunos/${id}`, { method: 'DELETE' });
    // Após remover, buscar a lista atualizada do backend
    fetchAlunos();
  };

  const handleEdit = (aluno: Aluno) => {
    setEditId(aluno.id);
    setEditNome(aluno.nome);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId === null || !editNome.trim()) return;
    await fetch(`/alunos/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: editNome })
    });
    setEditId(null);
    setEditNome('');
    fetchAlunos();
  };

  return (
    <div className="aluno-list">
      <h2>Lista de Alunos</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Nome do aluno"
          style={{ flex: 1, borderRadius: 8, border: '1px solid #ccc', padding: 8 }}
        />
        <button className="btn-pill" type="submit">adicionar</button>
      </form>
      {loading ? <p>Carregando...</p> : (
        <ul>
          {alunos.map(aluno => (
            <li key={aluno.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {editId === aluno.id ? (
                <form onSubmit={handleUpdate} style={{ display: 'flex', gap: 8, flex: 1 }}>
                  <input
                    type="text"
                    value={editNome}
                    onChange={e => setEditNome(e.target.value)}
                    style={{ flex: 1, borderRadius: 8, border: '1px solid #ccc', padding: 8 }}
                  />
                  <button className="btn-pill" type="submit">salvar</button>
                  <button className="btn-pill" type="button" onClick={() => setEditId(null)}>cancelar</button>
                </form>
              ) : (
                <>
                  <span style={{ flex: 1 }}>{aluno.nome}</span>
                  <button className="btn-pill editar" type="button" onClick={() => handleEdit(aluno)}>editar</button>
                  <button className="btn-pill remover" type="button" onClick={() => handleDelete(aluno.id)}>remover</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlunoList;
