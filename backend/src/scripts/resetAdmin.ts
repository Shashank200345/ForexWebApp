import mongoose from 'mongoose';
import Admin from '../models/Admin';
import dotenv from 'dotenv';

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Delete all existing admins
    await Admin.deleteMany({});
    console.log('Cleared existing admins');

    // Create new admin
    const admin = new Admin({
      username: 'admin',
      password: 'admin123', // Will be hashed by the pre-save hook
      role: 'admin'
    });

    await admin.save();
    console.log('\nNew admin created successfully:');
    console.log('Username:', admin.username);
    console.log('Password: admin123');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
  process.exit();
};

resetAdmin(); 