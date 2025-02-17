"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const registrationRoutes_1 = __importDefault(require("./routes/registrationRoutes"));
const signalSubscriptionRoutes_1 = __importDefault(require("./routes/signalSubscriptionRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
// Verify required environment variables
if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
}
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
// CORS configuration
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://forex-signals-app.netlify.app',
            process.env.FRONTEND_URL
        ].filter(Boolean);
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
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
app.use('/api/contacts', contactRoutes_1.default);
app.use('/api/registrations', registrationRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/signal-subscriptions', signalSubscriptionRoutes_1.default);
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
// Add this near your other routes
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});
// MongoDB connection
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined');
        }
        console.log('Attempting to connect to MongoDB...');
        yield mongoose_1.default.connect(uri);
        console.log('Connected to MongoDB:', mongoose_1.default.connection.name);
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
});
// Connect to MongoDB
connectDB();
// Error handling middleware
app.use((err, req, res, next) => {
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
