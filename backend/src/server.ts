import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import contactRoutes from './routes/contactRoutes';
import registrationRoutes from './routes/registrationRoutes';
import signalSubscriptionRoutes from './routes/signalSubscriptionRoutes';
import adminRoutes from './routes/adminRoutes';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Verify required environment variables
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(mongoSanitize());

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-domain.com' // Add your frontend domain after deployment
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log('Request:', {
    method: req.method,
    path: req.path,
    body: req.body
  });
  next();
});

// Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/signal-subscriptions', signalSubscriptionRoutes);

// Add a test route to verify admin endpoint
app.get('/api/admin/test', (req, res) => {
  res.json({ message: 'Admin API is working' });
});

// Add error logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    query: req.query
  });
  next();
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// MongoDB connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined');
    }
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB:', mongoose.connection.name);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 