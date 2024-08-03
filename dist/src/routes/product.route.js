"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Config
const multer_1 = require("../config/multer");
// Models
const product_model_1 = require("../models/product.model");
// Controllers
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
// Middlewares
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const router = express_1.default.Router();
exports.default = router
    .get('/', products_controller_1.default.findAll)
    .get('/:id', products_controller_1.default.findById)
    .post('/', auth_middleware_1.default, multer_1.memoryUpload.any(), (0, validate_middleware_1.default)((0, product_model_1.validate)('create')), products_controller_1.default.createProduct)
    .patch('/:id', auth_middleware_1.default, (0, validate_middleware_1.default)((0, product_model_1.validate)('update')), products_controller_1.default.updateProduct)
    .delete('/:id', auth_middleware_1.default, products_controller_1.default.deleteProduct);
