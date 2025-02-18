import express from 'express';
import { adminLogin, getAllUsers, getDashboardData } from '../controllers/adminController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/admin/login
router.post('/login', adminLogin);

// GET /api/admin/users
router.get('/users', authenticateAdmin, getAllUsers);

// GET /api/admin/dashboard
router.get('/dashboard', authenticateAdmin, getDashboardData);

export default router; 