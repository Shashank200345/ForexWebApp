import mongoose from 'mongoose';
import Admin from '../models/Admin';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });

    if (existingAdmin) {
      // Update existing admin's password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      
      console.log('Admin password updated successfully');
    } else {
      // Create new admin
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      const admin = new Admin({
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      });

      await admin.save();
      console.log('New admin user created successfully');
    }

    console.log('\nAdmin Credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
  process.exit();
};

createAdmin(); 