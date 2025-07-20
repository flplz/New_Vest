import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração de caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para teste da máscara de telefone
app.get('/teste-telefone', (req, res) => {
  res.sendFile(path.join(__dirname, 'teste-telefone.html'));
});

// Rota do formulário
app.post('/api/enviar-formulario', async (req, res) => {
  // URL do seu Google Apps Script - ATUALIZE ESTA URL
  const GAS_URL = 'https://script.google.com/macros/s/AKfycby9ZilXoIjbtfv4gJyXnvRgVVb-73KC1qK5BbPvU4Q4-l5aT1tk_NhvBvmPCZ9BoO1yYw/exec';
  
  try {
    // Formatar dados para o Google Sheets
    const dados = {
      nome: req.body.nome || '',
      email: req.body.email || '',
      telefone: req.body.telefone || '',
      tipo: req.body.tipo || '',
      data: new Date().toLocaleString('pt-BR'),
      timestamp: new Date().toISOString()
    };

    console.log('Enviando dados para Google Sheets:', dados);

    // Enviar dados como FormData (formato que o GAS espera)
    const formData = new URLSearchParams();
    formData.append('nome', dados.nome);
    formData.append('email', dados.email);
    formData.append('telefone', dados.telefone);
    formData.append('tipo', dados.tipo);
    formData.append('data', dados.data);
    formData.append('timestamp', dados.timestamp);

    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('Resposta do GAS:', responseText);

    // Verificar se a resposta indica sucesso
    if (responseText.includes('success') || responseText.includes('sucesso')) {
      res.json({ 
        status: 'success',
        message: 'Dados enviados com sucesso para o Google Sheets!'
      });
    } else {
      throw new Error('Resposta inesperada do Google Apps Script');
    }

  } catch (error) {
    console.error('Erro ao enviar para Google Sheets:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Erro ao enviar dados para o Google Sheets. Verifique a configuração.',
      details: error.message
    });
  }
});

// Rota de teste para verificar se o servidor está funcionando
app.get('/api/teste', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Servidor funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Teste o servidor em: http://localhost:${PORT}/api/teste`);
});