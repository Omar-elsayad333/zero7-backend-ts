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
const product_model_1 = __importDefault(require("@/models/product.model"));
const helpers_1 = require("@/utils/helpers");
// Utils
const storage_1 = require("@/utils/storage");
const findAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    return product_model_1.default.find();
});
const findByIdService = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return product_model_1.default.findById(productId);
});
const createProduct = (body, files) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFiles = files && (yield (0, storage_1.uploadMultipleFilesToFirebase)(files, 'products'));
    (0, helpers_1.setValuesInBody)(body, files, uploadedFiles);
    const productExist = yield product_model_1.default.findOne({ name: body.name });
    if (productExist)
        throw new Error('response_messages.product_already_exist');
    return product_model_1.default.create(body);
});
const updateProduct = (productId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const productExist = body.name && (yield product_model_1.default.findOne({ name: body.name }));
    if (productExist)
        throw new Error('response_messages.product_already_exist');
    return product_model_1.default.findOneAndUpdate({ _id: productId }, body, { new: true });
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return product_model_1.default.findByIdAndDelete(productId);
});
exports.default = {
    findAllService,
    findByIdService,
    createProduct,
    updateProduct,
    deleteProduct,
};
