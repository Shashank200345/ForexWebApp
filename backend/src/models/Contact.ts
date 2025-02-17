import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
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
  acceptedTerms: {
    type: Boolean,
    required: [true, 'Terms acceptance is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'contacts',
  timestamps: true
});

contactSchema.pre('save', function(next) {
  console.log('Saving contact:', this);
  next();
});

export default mongoose.model('Contact', contactSchema); 