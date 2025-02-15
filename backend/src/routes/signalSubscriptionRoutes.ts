import express from 'express';
import { body } from 'express-validator';
import { createSignalSubscription, getSignalSubscriptions } from '../controllers/signalSubscriptionController';

const router = express.Router();

// Validation middleware
const signalSubscriptionValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Please enter a valid email'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('signalPackId').isNumeric().withMessage('Signal pack ID must be a number'),
  body('signalPackTitle').trim().notEmpty().withMessage('Signal pack title is required'),
  body('price').trim().notEmpty().withMessage('Price is required')
];

// Routes
router.post('/', signalSubscriptionValidation, createSignalSubscription);
router.get('/', getSignalSubscriptions);

export default router; 