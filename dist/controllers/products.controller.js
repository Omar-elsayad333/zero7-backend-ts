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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.findById = exports.findAll = void 0;
// Services
const products_service_1 = __importDefault(require("../services/products.service"));
const response_service_1 = require("../services/response.service");
// GET /products
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_service_1.default.findAllService();
        next(new response_service_1.SuccessResponse('', products));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.findAll = findAll;
// GET /products/:id
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield products_service_1.default.findByIdService(id);
        next(new response_service_1.SuccessResponse('', product));
        throw new Error();
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.findById = findById;
// POST /products
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, files } = req;
        const product = yield products_service_1.default.createProduct(body, files);
        next(new response_service_1.CreateResponse('', product));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message, error));
    }
});
exports.createProduct = createProduct;
// PATCH /products/:id
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { id } = req.params;
        const product = yield products_service_1.default.updateProduct(id, body);
        next(new response_service_1.SuccessResponse('', product));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message, error));
    }
});
exports.updateProduct = updateProduct;
// DELETE /products/:id
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield products_service_1.default.deleteProduct(id);
        next(new response_service_1.SuccessResponse('', product));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.deleteProduct = deleteProduct;
exports.default = {
    findAll: exports.findAll,
    findById: exports.findById,
    createProduct: exports.createProduct,
    updateProduct: exports.updateProduct,
    deleteProduct: exports.deleteProduct,
};
