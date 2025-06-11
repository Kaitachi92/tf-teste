// Arquivo removido para evitar conflitos de sintaxe e duplicidade de migrations.

exports.up = (pgm) => {
  pgm.createTable('turma', {
    id: 'serial',
    nome: { type: 'varchar(100)', notNull: true }
  });
  pgm.createTable('professor', {
    id: 'serial',
    nome: { type: 'varchar(100)', notNull: true }
  });
  pgm.createTable('aluno', {
    id: 'serial',
    nome: { type: 'varchar(100)', notNull: true },
    numero: { type: 'varchar(20)' },
    email: { type: 'varchar(120)' },
    cidade: { type: 'varchar(80)' },
    bairro: { type: 'varchar(80)' },
    cep: { type: 'varchar(12)' },
    numero_responsavel: { type: 'varchar(20)' },
    turma_id: {
      type: 'integer',
      references: 'turma',
      onDelete: 'set null'
    }
  });
  pgm.createTable('professor_turma', {
    id: 'serial',
    professor_id: {
      type: 'integer',
      references: 'professor',
      onDelete: 'cascade'
    },
    turma_id: {
      type: 'integer',
      references: 'turma',
      onDelete: 'cascade'
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('professor_turma');
  pgm.dropTable('aluno');
  pgm.dropTable('professor');
  pgm.dropTable('turma');
};
