import express from 'express';
const router = express.Router();
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';
import roles from '../enums/roles.js';

// rotas publicas
router.post('/', createUser);

// rotas protegidas
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);

// rotas protegidas - cargo de administrador apenas
router.put('/:id', verifyToken, requireRole([roles.admin]), updateUser);
router.delete('/:id', verifyToken, requireRole([roles.admin]), deleteUser);

export default router;
