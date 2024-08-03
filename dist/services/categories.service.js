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
// Models
const category_model_1 = __importDefault(require("../models/category.model"));
const findAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    return category_model_1.default.find();
});
const findByIdService = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    return category_model_1.default.findById(categoryId);
});
const createCategory = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const CategoryExist = yield category_model_1.default.findOne({ name: body.name });
    if (CategoryExist)
        throw new Error('response_messages.category_already_exist');
    return category_model_1.default.create(body);
});
const updateCategory = (categoryId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const CategoryExist = body.name && (yield category_model_1.default.findOne({ name: body.name }));
    if (CategoryExist)
        throw new Error('response_messages.category_already_exist');
    return category_model_1.default.findOneAndUpdate({ _id: categoryId }, body, { new: true });
});
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    return category_model_1.default.findByIdAndDelete(categoryId);
});
exports.default = {
    findAllService,
    findByIdService,
    createCategory,
    updateCategory,
    deleteCategory,
};
