import mongoose from 'mongoose';
import Admin from '../models/Admin';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/forex_landing';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const admin = new Admin({
      username: 'admin',
      password: 'admin123' // This will be hashed automatically by the model
    });

    await admin.save();
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin(); 