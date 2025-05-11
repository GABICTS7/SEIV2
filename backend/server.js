const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configuração do caminho base
const BASE_DIR = path.join(__dirname, '..'); // Volta um nível para a raiz do projeto

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da raiz do projeto
app.use(express.static(BASE_DIR));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(BASE_DIR, 'index.html'));
});

// Rota para login
app.get('/login(.html)?', (req, res) => {
  res.sendFile(path.join(BASE_DIR, 'pages', 'Login.html'), (err) => {
    if (err) {
      console.error('Erro ao carregar Login.html:', err);
      res.status(404).send('Página de login não encontrada');
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`
  🚀 Servidor rodando em http://localhost:${PORT}
  • Página inicial: http://localhost:${PORT}
  • Login: http://localhost:${PORT}/login
  `);
});