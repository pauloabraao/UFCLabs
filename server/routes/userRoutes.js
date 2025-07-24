import express from 'express';
const router = express.Router();
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';
import roles from '../enums/roles.js';

// Public route - anyone can create a user (registration)
router.post('/', createUser);

// Protected routes - require authentication
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);

// Admin only routes - require admin role
router.put('/:id', verifyToken, requireRole([roles.admin]), updateUser);
router.delete('/:id', verifyToken, requireRole([roles.admin]), deleteUser);

export default router;
