"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// POST /api/admin/login
router.post('/login', adminController_1.login);
// GET /api/admin/dashboard
router.get('/dashboard', authMiddleware_1.protect, adminController_1.getDashboardData);
exports.default = router;
