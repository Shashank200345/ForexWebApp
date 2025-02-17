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
exports.getRegistrations = exports.createRegistration = void 0;
const express_validator_1 = require("express-validator");
const Registration_1 = __importDefault(require("../models/Registration"));
const createRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        const { name, email, phone, country, packTitle, packPrice } = req.body;
        // Create new registration
        const registration = new Registration_1.default({
            name,
            email,
            phone,
            country,
            packTitle,
            packPrice
        });
        // Save registration to database
        yield registration.save();
        res.status(201).json({
            success: true,
            message: 'Registration submitted successfully',
            data: registration
        });
    }
    catch (error) {
        console.error('Error in createRegistration:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting registration',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
exports.createRegistration = createRegistration;
const getRegistrations = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrations = yield Registration_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: registrations
        });
    }
    catch (error) {
        console.error('Error in getRegistrations:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching registrations',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
exports.getRegistrations = getRegistrations;
