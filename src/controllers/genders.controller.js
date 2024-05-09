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
exports.deleteGender = exports.updateGender = exports.createGender = exports.findById = exports.findAll = void 0;
// Services
const genders_service_1 = __importDefault(require("@/services/genders.service"));
const response_service_1 = require("@/services/response.service");
// GET /genders
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genders = yield genders_service_1.default.findAllService();
        next(new response_service_1.SuccessResponse('', genders));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.findAll = findAll;
// GET /genders/:id
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const gender = yield genders_service_1.default.findByIdService(id);
        next(new response_service_1.SuccessResponse('', gender));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.findById = findById;
// POST /genders
const createGender = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const gender = yield genders_service_1.default.createGender(body);
        next(new response_service_1.CreateResponse('', gender));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message, error));
    }
});
exports.createGender = createGender;
// PATCH /genders/:id
const updateGender = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { id } = req.params;
        const gender = yield genders_service_1.default.updateGender(id, body);
        next(new response_service_1.SuccessResponse('', gender));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message, error));
    }
});
exports.updateGender = updateGender;
// DELETE /genders/:id
const deleteGender = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const gender = yield genders_service_1.default.deleteGender(id);
        next(new response_service_1.SuccessResponse('', gender));
    }
    catch (error) {
        next(new response_service_1.BadRequestError('', error));
    }
});
exports.deleteGender = deleteGender;
exports.default = {
    findAll: exports.findAll,
    findById: exports.findById,
    createGender: exports.createGender,
    updateGender: exports.updateGender,
    deleteGender: exports.deleteGender,
};
