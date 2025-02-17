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
const mongoose_1 = __importDefault(require("mongoose"));
const Admin_1 = __importDefault(require("../models/Admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const resetAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        // Delete all existing admins
        yield Admin_1.default.deleteMany({});
        console.log('Cleared existing admins');
        // Create new admin
        const admin = new Admin_1.default({
            username: 'admin',
            password: 'admin123', // Will be hashed by the pre-save hook
            role: 'admin'
        });
        yield admin.save();
        console.log('\nNew admin created successfully:');
        console.log('Username:', admin.username);
        console.log('Password: admin123');
        yield mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error:', error);
    }
    process.exit();
});
resetAdmin();
