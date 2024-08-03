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
exports.deleteSize = exports.updateSize = exports.createSize = exports.findById = exports.findAll = void 0;
// Services
const size_service_1 = __importDefault(require("../services/size.service"));
const response_service_1 = require("../services/response.service");
// GET /sizes
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sizes = yield size_service_1.default.findAllService();
        next(new response_service_1.SuccessResponse('', sizes));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.findAll = findAll;
// GET /sizes/:id
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const size = yield size_service_1.default.findByIdService(id);
        next(new response_service_1.SuccessResponse('', size));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.findById = findById;
// POST /sizes
const createSize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const size = yield size_service_1.default.createSize(body);
        next(new response_service_1.CreateResponse('', size));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message, error));
    }
});
exports.createSize = createSize;
// PATCH /sizes/:id
const updateSize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { id } = req.params;
        const size = yield size_service_1.default.updateSize(id, body);
        next(new response_service_1.SuccessResponse('', size));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message, error));
    }
});
exports.updateSize = updateSize;
// DELETE /sizes/:id
const deleteSize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const size = yield size_service_1.default.deleteSize(id);
        next(new response_service_1.SuccessResponse('', size));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.deleteSize = deleteSize;
exports.default = {
    findAll: exports.findAll,
    findById: exports.findById,
    createSize: exports.createSize,
    updateSize: exports.updateSize,
    deleteSize: exports.deleteSize,
};
