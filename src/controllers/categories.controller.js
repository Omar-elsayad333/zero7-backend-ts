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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.findById = exports.findAll = void 0;
// Services
const categories_service_1 = __importDefault(require("@/services/categories.service"));
const response_service_1 = require("@/services/response.service");
// GET /categories
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_service_1.default.findAllService();
        next(new response_service_1.SuccessResponse('', categories));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.findAll = findAll;
// GET /categories/:id
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield categories_service_1.default.findByIdService(id);
        next(new response_service_1.SuccessResponse('', category));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.findById = findById;
// POST /categories
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const category = yield categories_service_1.default.createCategory(body);
        next(new response_service_1.CreateResponse('', category));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message, error));
    }
});
exports.createCategory = createCategory;
// PATCH /categories/:id
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { id } = req.params;
        const category = yield categories_service_1.default.updateCategory(id, body);
        next(new response_service_1.SuccessResponse('', category));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message, error));
    }
});
exports.updateCategory = updateCategory;
// DELETE /categories/:id
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield categories_service_1.default.deleteCategory(id);
        next(new response_service_1.SuccessResponse('', category));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.deleteCategory = deleteCategory;
exports.default = {
    findAll: exports.findAll,
    findById: exports.findById,
    createCategory: exports.createCategory,
    updateCategory: exports.updateCategory,
    deleteCategory: exports.deleteCategory,
};
