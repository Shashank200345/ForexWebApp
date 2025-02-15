import express from 'express';
import { body } from 'express-validator';
import { createRegistration, getRegistrations } from '../controllers/registrationController';

const router = express.Router();

// Validation middleware
const registrationValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Please enter a valid email'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('packTitle').trim().notEmpty().withMessage('Signal pack title is required'),
  body('packPrice').trim().notEmpty().withMessage('Signal pack price is required')
];

// Routes
router.post('/', registrationValidation, createRegistration);
router.get('/', getRegistrations);

export default router; 