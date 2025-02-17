"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const registrationController_1 = require("../controllers/registrationController");
const router = express_1.default.Router();
// Validation middleware
const registrationValidation = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').trim().isEmail().withMessage('Please enter a valid email'),
    (0, express_validator_1.body)('phone').trim().notEmpty().withMessage('Phone number is required'),
    (0, express_validator_1.body)('country').trim().notEmpty().withMessage('Country is required'),
    (0, express_validator_1.body)('packTitle').trim().notEmpty().withMessage('Signal pack title is required'),
    (0, express_validator_1.body)('packPrice').trim().notEmpty().withMessage('Signal pack price is required')
];
// Routes
router.post('/', registrationValidation, registrationController_1.createRegistration);
router.get('/', registrationController_1.getRegistrations);
exports.default = router;
