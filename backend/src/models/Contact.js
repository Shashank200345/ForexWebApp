"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
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
contactSchema.pre('save', function (next) {
    console.log('Saving contact:', this);
    next();
});
exports.default = mongoose_1.default.model('Contact', contactSchema);
