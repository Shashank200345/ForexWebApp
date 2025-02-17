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
exports.getContacts = exports.createContact = void 0;
const express_validator_1 = require("express-validator");
const Contact_1 = __importDefault(require("../models/Contact"));
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Received contact data:', req.body);
        // Validation
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        // Create and save contact
        const contact = new Contact_1.default(req.body);
        const savedContact = yield contact.save();
        console.log('Contact saved:', savedContact);
        res.status(201).json({
            success: true,
            message: 'Contact created successfully',
            data: savedContact
        });
    }
    catch (error) {
        console.error('Contact creation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create contact'
        });
    }
});
exports.createContact = createContact;
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield Contact_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: contacts
        });
    }
    catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts'
        });
    }
});
exports.getContacts = getContacts;
