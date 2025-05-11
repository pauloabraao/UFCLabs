const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota de teste
router.get('/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Conexão com o banco OK', solution: rows[0].solution });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;