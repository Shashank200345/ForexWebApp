import express from 'express';
import { body } from 'express-validator';
import { login, getDashboardStats } from '../controllers/adminController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Validation middleware
const loginValidation = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().notEmpty().withMessage('Password is required')
];

// Public routes
router.post('/login', loginValidation, login);

// Protected routes
router.use(protect);
router.get('/dashboard/stats', getDashboardStats);

export default router; 