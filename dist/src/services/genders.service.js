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
const gender_models_1 = __importDefault(require("../models/gender.models"));
const findAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    return gender_models_1.default.find();
});
const findByIdService = (genderId) => __awaiter(void 0, void 0, void 0, function* () {
    return gender_models_1.default.findById(genderId);
});
const createGender = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const genderExist = yield gender_models_1.default.findOne({ name: body.name });
    if (genderExist)
        throw new Error('response_messages.gender_already_exist');
    return gender_models_1.default.create(body);
});
const updateGender = (genderId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const genderExist = body.name && (yield gender_models_1.default.findOne({ name: body.name }));
    if (genderExist)
        throw new Error('response_messages.gender_already_exist');
    return gender_models_1.default.findOneAndUpdate({ _id: genderId }, body, { new: true });
});
const deleteGender = (genderId) => __awaiter(void 0, void 0, void 0, function* () {
    return gender_models_1.default.findByIdAndDelete(genderId);
});
exports.default = {
    findAllService,
    findByIdService,
    createGender,
    updateGender,
    deleteGender,
};
