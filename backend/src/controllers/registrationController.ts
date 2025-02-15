import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Registration from '../models/Registration';

export const createRegistration = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, phone, country, packTitle, packPrice } = req.body;

    // Create new registration
    const registration = new Registration({
      name,
      email,
      phone,
      country,
      packTitle,
      packPrice
    });

    // Save registration to database
    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      data: registration
    });
  } catch (error) {
    console.error('Error in createRegistration:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting registration',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const getRegistrations = async (_req: Request, res: Response) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: registrations
    });
  } catch (error) {
    console.error('Error in getRegistrations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}; 