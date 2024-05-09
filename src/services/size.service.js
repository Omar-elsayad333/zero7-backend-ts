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
const size_models_1 = __importDefault(require("@/models/size.models"));
const findAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    return size_models_1.default.find();
});
const findByIdService = (sizeId) => __awaiter(void 0, void 0, void 0, function* () {
    return size_models_1.default.findById(sizeId);
});
const createSize = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const sizeExist = yield size_models_1.default.findOne({ name: body.name });
    if (sizeExist)
        throw new Error('response_messages.size_already_exist');
    return size_models_1.default.create(body);
});
const updateSize = (sizeId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const sizeExist = body.name && (yield size_models_1.default.findOne({ name: body.name }));
    if (sizeExist)
        throw new Error('response_messages.size_already_exist');
    return size_models_1.default.findOneAndUpdate({ _id: sizeId }, body, { new: true });
});
const deleteSize = (sizeId) => __awaiter(void 0, void 0, void 0, function* () {
    return size_models_1.default.findByIdAndDelete(sizeId);
});
exports.default = {
    findAllService,
    findByIdService,
    createSize,
    updateSize,
    deleteSize,
};
