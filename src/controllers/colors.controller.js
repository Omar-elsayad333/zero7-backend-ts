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
exports.deleteColor = exports.updateColor = exports.createColor = exports.findById = exports.findAll = void 0;
// Services
const colors_service_1 = __importDefault(require("@/services/colors.service"));
const response_service_1 = require("@/services/response.service");
// GET /colors
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const colors = yield colors_service_1.default.findAllService();
        next(new response_service_1.SuccessResponse('', colors));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.findAll = findAll;
// GET /colors/:id
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const color = yield colors_service_1.default.findByIdService(id);
        next(new response_service_1.SuccessResponse('', color));
        throw new Error();
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.findById = findById;
// POST /colors
const createColor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const color = yield colors_service_1.default.createColor(body);
        next(new response_service_1.CreateResponse('', color));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message, error));
    }
});
exports.createColor = createColor;
// PATCH /colors/:id
const updateColor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { id } = req.params;
        const color = yield colors_service_1.default.updateColor(id, body);
        next(new response_service_1.SuccessResponse('', color));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message, error));
    }
});
exports.updateColor = updateColor;
// DELETE /colors/:id
const deleteColor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const color = yield colors_service_1.default.deleteColor(id);
        next(new response_service_1.SuccessResponse('', color));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.deleteColor = deleteColor;
exports.default = {
    findAll: exports.findAll,
    findById: exports.findById,
    createColor: exports.createColor,
    updateColor: exports.updateColor,
    deleteColor: exports.deleteColor,
};
