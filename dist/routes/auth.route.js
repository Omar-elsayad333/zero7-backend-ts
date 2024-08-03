"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
// Middlewares
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
// Models
const user_model_1 = require("../models/user.model");
// Controllers
const auth_controller_1 = require("../controllers/auth.controller");
const FRONT_URL = process.env.FRONT_URL;
const router = express_1.default.Router();
exports.default = router
    .post('/login', (0, validate_middleware_1.default)((0, user_model_1.validateSchema)('login')), auth_controller_1.login)
    .post('/signup', (0, validate_middleware_1.default)((0, user_model_1.validateSchema)('signup')), auth_controller_1.signup)
    .get('/verfiy/:email/:token', auth_controller_1.verfiy)
    .get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }))
    .get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: `${FRONT_URL}/login` }), auth_controller_1.google);
