"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Middlewares
// Controllers
const test_controller_1 = require("@/controllers/test.controller");
const router = express_1.default.Router();
router
    .get('/', test_controller_1.test)
    .post('/create', test_controller_1.createTest)
    .get('/login', test_controller_1.loginTest)
    .get('/profile', test_controller_1.profileTest)
    .get('/logout', test_controller_1.logoutTest);
exports.default = router;
