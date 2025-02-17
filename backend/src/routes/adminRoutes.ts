import express from 'express';
import { login, getDashboardData } from '../controllers/adminController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/admin/login
router.post('/login', login);

// GET /api/admin/dashboard
router.get('/dashboard', protect, getDashboardData);

export default router; 