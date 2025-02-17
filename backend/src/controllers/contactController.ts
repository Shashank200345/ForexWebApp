import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Contact from '../models/Contact';

export const createContact = async (req: Request, res: Response) => {
  try {
    console.log('Received contact data:', req.body);

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    // Create and save contact
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    
    console.log('Contact saved:', savedContact);

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: savedContact
    });
  } catch (error: any) {
    console.error('Contact creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create contact'
    });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
}; 