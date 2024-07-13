const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const imoveisRouter = require('./routes/properties');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bancoDeDados', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});

// Usando as rotas dos imóveis
app.use('/api/properties', imoveisRouter);

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para servir a página de administração
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Rota para servir a página sobre
app.get('/sobre', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
});

// Rota para servir a página contato
app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contato.html'));
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
