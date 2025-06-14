require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste básica
app.get('/', (req, res) => {
  res.json({ 
    message: 'API funcionando!', 
    timestamp: new Date().toISOString() 
  });
});

// Inicializar servidor
async function startServer() {
  try {
    // Testa conexão com banco
    await db.authenticate();
    console.log('✅ Database connected successfully');
    
    // Inicia servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 Access: http://localhost:${PORT}`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();