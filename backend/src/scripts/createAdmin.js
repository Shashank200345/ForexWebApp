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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        // Check if admin exists
        const existingAdmin = yield Admin_1.default.findOne({ username: 'admin' });
        if (existingAdmin) {
            // Update existing admin's password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash('admin123', salt);
            existingAdmin.password = hashedPassword;
            yield existingAdmin.save();
            console.log('Admin password updated successfully');
        }
        else {
            // Create new admin
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash('admin123', salt);
            const admin = new Admin_1.default({
                username: 'admin',
                password: hashedPassword,
                role: 'admin'
            });
            yield admin.save();
            console.log('New admin user created successfully');
        }
        console.log('\nAdmin Credentials:');
        console.log('Username: admin');
        console.log('Password: admin123');
        yield mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error:', error);
    }
    process.exit();
});
createAdmin();
