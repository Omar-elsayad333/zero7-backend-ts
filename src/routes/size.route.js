"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Models
const size_models_1 = require("@/models/size.models");
// Controllers
const sizes_controller_1 = __importDefault(require("@/controllers/sizes.controller"));
// Middlewares
const auth_middleware_1 = __importDefault(require("@/middlewares/auth.middleware"));
const validate_middleware_1 = __importDefault(require("@/middlewares/validate.middleware"));
const router = express_1.default.Router();
exports.default = router
    .get('/', sizes_controller_1.default.findAll)
    .get('/:id', sizes_controller_1.default.findById)
    .post('/', auth_middleware_1.default, (0, validate_middleware_1.default)((0, size_models_1.validate)('create')), sizes_controller_1.default.createSize)
    .patch('/:id', auth_middleware_1.default, (0, validate_middleware_1.default)((0, size_models_1.validate)('update')), sizes_controller_1.default.updateSize)
    .delete('/:id', auth_middleware_1.default, sizes_controller_1.default.deleteSize);
