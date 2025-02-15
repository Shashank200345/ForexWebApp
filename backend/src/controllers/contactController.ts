import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Contact from '../models/Contact';

export const createContact = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, phone, country, acceptedTerms } = req.body;

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone,
      country,
      acceptedTerms
    });

    // Save contact to database
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact request submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error in createContact:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact request',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const getContacts = async (_req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Error in getContacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}; 