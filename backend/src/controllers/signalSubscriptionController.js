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
exports.getSignalSubscriptions = exports.createSignalSubscription = void 0;
const express_validator_1 = require("express-validator");
const SignalSubscription_1 = __importDefault(require("../models/SignalSubscription"));
const createSignalSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        const { name, email, phone, country, signalPackId, signalPackTitle, price } = req.body;
        // Create new signal subscription
        const subscription = new SignalSubscription_1.default({
            name,
            email,
            phone,
            country,
            signalPackId,
            signalPackTitle,
            price
        });
        // Save subscription to database
        yield subscription.save();
        res.status(201).json({
            success: true,
            message: 'Signal pack subscription submitted successfully',
            data: subscription
        });
    }
    catch (error) {
        console.error('Error in createSignalSubscription:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting signal pack subscription',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
exports.createSignalSubscription = createSignalSubscription;
const getSignalSubscriptions = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptions = yield SignalSubscription_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: subscriptions
        });
    }
    catch (error) {
        console.error('Error in getSignalSubscriptions:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching signal subscriptions',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
exports.getSignalSubscriptions = getSignalSubscriptions;
