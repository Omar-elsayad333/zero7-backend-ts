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
const color_models_1 = __importDefault(require("../models/color.models"));
const findAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    return color_models_1.default.find();
});
const findByIdService = (colorId) => __awaiter(void 0, void 0, void 0, function* () {
    return color_models_1.default.findById(colorId);
});
const createColor = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const colorExist = yield color_models_1.default.findOne({ name: body.name });
    if (colorExist)
        throw new Error('response_messages.color_already_exist');
    return color_models_1.default.create(body);
});
const updateColor = (colorId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const colorExist = body.name && (yield color_models_1.default.findOne({ name: body.name }));
    if (colorExist)
        throw new Error('response_messages.color_already_exist');
    return color_models_1.default.findOneAndUpdate({ _id: colorId }, body, { new: true });
});
const deleteColor = (colorId) => __awaiter(void 0, void 0, void 0, function* () {
    return color_models_1.default.findByIdAndDelete(colorId);
});
exports.default = {
    findAllService,
    findByIdService,
    createColor,
    updateColor,
    deleteColor,
};
