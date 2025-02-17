"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const signalSubscriptionController_1 = require("../controllers/signalSubscriptionController");
const router = express_1.default.Router();
// Validation middleware
const signalSubscriptionValidation = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').trim().isEmail().withMessage('Please enter a valid email'),
    (0, express_validator_1.body)('phone').trim().notEmpty().withMessage('Phone number is required'),
    (0, express_validator_1.body)('country').trim().notEmpty().withMessage('Country is required'),
    (0, express_validator_1.body)('signalPackId').isNumeric().withMessage('Signal pack ID must be a number'),
    (0, express_validator_1.body)('signalPackTitle').trim().notEmpty().withMessage('Signal pack title is required'),
    (0, express_validator_1.body)('price').trim().notEmpty().withMessage('Price is required')
];
// Routes
router.post('/', signalSubscriptionValidation, signalSubscriptionController_1.createSignalSubscription);
router.get('/', signalSubscriptionController_1.getSignalSubscriptions);
exports.default = router;
