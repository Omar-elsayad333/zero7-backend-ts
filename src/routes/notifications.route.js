"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Controllers
const notification_controller_1 = require("@/controllers/notification.controller");
const router = express_1.default.Router();
router.get('/', notification_controller_1.findAll);
exports.default = router;
