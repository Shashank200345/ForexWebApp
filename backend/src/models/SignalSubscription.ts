import mongoose, { Document, Schema } from 'mongoose';

export interface ISignalSubscription extends Document {
  name: string;
  email: string;
  phone: string;
  country: string;
  signalPackId: number;
  signalPackTitle: string;
  price: string;
  status: 'pending' | 'active' | 'expired';
  createdAt: Date;
}

const SignalSubscriptionSchema: Schema = new Schema({
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
  signalPackId: {
    type: Number,
    required: [true, 'Signal pack ID is required']
  },
  signalPackTitle: {
    type: String,
    required: [true, 'Signal pack title is required']
  },
  price: {
    type: String,
    required: [true, 'Price is required']
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'expired'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ISignalSubscription>('SignalSubscription', SignalSubscriptionSchema); 