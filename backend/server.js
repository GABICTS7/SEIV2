const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================================
// CONFIGURAÇÕES E DADOS TEMPORÁRIOS
// =============================================
const CREDENCIAIS_ADMIN = {
  email: "admin@escola.com",
  senha: "admin123"
};

// Dados iniciais
let professores = [ /* ... */ ];
let turmas = [ /* ... */ ];
let eventos = [ /* ... */ ];
let gradesGeradas = [ /* ... */ ];

// =============================================
// ROTAS DA API (BACKEND)
// =============================================
// (Mantenha suas rotas API existentes para professores, turmas, etc.)
// ...

// Rota específica para Grades Geradas (API)
app.get('/api/gradesGeradas', (req, res) => {
  res.json({ success: true, gradesGeradas });
});

app.post('/api/gradesGeradas', (req, res) => {
  const { turma, disciplina, horario } = req.body;
  const novaGrade = { id: gradesGeradas.length + 1, turma, disciplina, horario };
  gradesGeradas.push(novaGrade);
  res.json({ success: true, message: 'Grade cadastrada!', grade: novaGrade });
});

// =============================================
// ROTAS DAS PÁGINAS (FRONTEND)
// =============================================
const FRONTEND_DIR = path.join(__dirname, '../frontend');

// Configuração de arquivos estáticos
app.use(express.static(FRONTEND_DIR, { extensions: ['html', 'htm'] }));

// Rota para GradeGerada.html (CORRIGIDA)
app.get('/gradeGerada(.html)?', (req, res) => {
  const filePath = path.join(FRONTEND_DIR, 'pages', 'GradeGerada.html');
  console.log('Tentando carregar:', filePath); // Debug
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Erro ao carregar GradeGerada.html:', err);
      res.status(404).send('Página de grade não encontrada');
    }
  });
});

// Rotas para outras páginas (professores, turmas, etc.)
// ...

// =============================================
// INICIA O SERVIDOR
// =============================================
app.listen(PORT, () => {
  console.log(`
  🚀 Servidor rodando em http://localhost:${PORT}
  • Grades Geradas: http://localhost:${PORT}/gradeGerada
  `);
});