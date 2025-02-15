import express from 'express';
import { body } from 'express-validator';
import { createContact, getContacts } from '../controllers/contactController';

const router = express.Router();

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  
  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  
  body('acceptedTerms')
    .isBoolean()
    .equals('true')
    .withMessage('You must accept the terms and conditions')
];

// Routes
router.post('/', validateContact, createContact);
router.get('/', getContacts);

export default router; 