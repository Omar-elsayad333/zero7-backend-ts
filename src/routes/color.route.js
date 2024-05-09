"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Models
const color_models_1 = require("@/models/color.models");
// Controllers
const colors_controller_1 = __importDefault(require("@/controllers/colors.controller"));
// Middlewares
const auth_middleware_1 = __importDefault(require("@/middlewares/auth.middleware"));
const validate_middleware_1 = __importDefault(require("@/middlewares/validate.middleware"));
const router = express_1.default.Router();
exports.default = router
    .get('/', colors_controller_1.default.findAll)
    .get('/:id', colors_controller_1.default.findById)
    .post('/', auth_middleware_1.default, (0, validate_middleware_1.default)((0, color_models_1.validate)('create')), colors_controller_1.default.createColor)
    .patch('/:id', auth_middleware_1.default, (0, validate_middleware_1.default)((0, color_models_1.validate)('update')), colors_controller_1.default.updateColor)
    .delete('/:id', auth_middleware_1.default, colors_controller_1.default.deleteColor);
