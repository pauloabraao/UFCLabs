import express from 'express';
const router = express.Router();
import { getAllPrograms, createProgram, getProgramById, updateProgram, deleteProgram } from '../controllers/programController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';
import roles from '../enums/roles.js';

// Rotas públicas
router.get('/', getAllPrograms);
router.get('/:id', getProgramById);

// Rotas protegidas - Apenas admin e tech podem gerenciar programas
router.post('/', verifyToken, requireRole([roles.admin, roles.tech]), createProgram);
router.put('/:id', verifyToken, requireRole([roles.admin, roles.tech]), updateProgram);
router.delete('/:id', verifyToken, requireRole([roles.admin, roles.tech]), deleteProgram);

export default router;
