import mongoose, { Document, Schema } from 'mongoose';

export interface IRegistration extends Document {
  name: string;
  email: string;
  phone: string;
  country: string;
  packTitle: string;
  packPrice: string;
  createdAt: Date;
}

const RegistrationSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  packTitle: {
    type: String,
    required: [true, 'Signal pack title is required']
  },
  packPrice: {
    type: String,
    required: [true, 'Signal pack price is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IRegistration>('Registration', RegistrationSchema); 