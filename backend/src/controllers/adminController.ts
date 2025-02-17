import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import Contact from '../models/Contact';
import Registration from '../models/Registration';

// Admin login
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username });

    if (!username || !password) {
      console.log('Missing credentials');
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const admin = await Admin.findOne({ username: username.trim() });
    console.log('Admin found:', !!admin);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await admin.comparePassword(password.trim());
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    console.log('Login successful for:', username);

    return res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Get all contacts and registrations
export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    const registrations = await Registration.find().sort({ createdAt: -1 });
    
    console.log('Fetched registrations:', registrations); // Debug log

    res.json({
      success: true,
      contacts,
      registrations
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
}; 