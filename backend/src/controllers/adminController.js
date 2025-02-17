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
exports.getDashboardData = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const Contact_1 = __importDefault(require("../models/Contact"));
const Registration_1 = __importDefault(require("../models/Registration"));
// Admin login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const admin = yield Admin_1.default.findOne({ username: username.trim() });
        console.log('Admin found:', !!admin);
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const isMatch = yield admin.comparePassword(password.trim());
        console.log('Password match:', isMatch);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1d' });
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
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});
exports.login = login;
// Get all contacts and registrations
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield Contact_1.default.find().sort({ createdAt: -1 });
        const registrations = yield Registration_1.default.find().sort({ createdAt: -1 });
        console.log('Fetched registrations:', registrations); // Debug log
        res.json({
            success: true,
            contacts,
            registrations
        });
    }
    catch (error) {
        console.error('Dashboard data error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});
exports.getDashboardData = getDashboardData;
