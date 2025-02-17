"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const contactController_1 = require("../controllers/contactController");
const router = express_1.default.Router();
// Validation middleware
const validateContact = [
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email'),
    (0, express_validator_1.body)('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required'),
    (0, express_validator_1.body)('country')
        .trim()
        .notEmpty()
        .withMessage('Country is required'),
    (0, express_validator_1.body)('acceptedTerms')
        .isBoolean()
        .equals('true')
        .withMessage('You must accept the terms and conditions')
];
// Routes
router.post('/', validateContact, contactController_1.createContact);
router.get('/', contactController_1.getContacts);
exports.default = router;
