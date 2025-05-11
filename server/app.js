require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

const campusRoutes = require('./routes/campusRoutes');
app.use('/api/campuses', campusRoutes);


// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});