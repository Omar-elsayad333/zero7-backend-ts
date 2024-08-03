"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Models
const category_model_1 = require("../models/category.model");
// Controllers
const categories_controller_1 = __importDefault(require("../controllers/categories.controller"));
// Middlewares
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const router = express_1.default.Router();
exports.default = router
    .get('/', categories_controller_1.default.findAll)
    .get('/:id', categories_controller_1.default.findById)
    .post('/', auth_middleware_1.default, (0, validate_middleware_1.default)((0, category_model_1.validate)('create')), categories_controller_1.default.createCategory)
    .patch('/:id', auth_middleware_1.default, (0, validate_middleware_1.default)((0, category_model_1.validate)('update')), categories_controller_1.default.updateCategory)
    .delete('/:id', auth_middleware_1.default, categories_controller_1.default.deleteCategory);
