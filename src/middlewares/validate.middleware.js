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
Object.defineProperty(exports, "__esModule", { value: true });
// Services
const response_service_1 = require("@/services/response.service");
const validateMiddleware = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { file } = req;
        const data = Object.assign({}, req.body);
        if (file)
            data[file['fieldname']] = file;
        const { error } = schema(data);
        if (error) {
            const modifiedError = (_a = error.details) === null || _a === void 0 ? void 0 : _a.map((item) => item.message);
            next(new response_service_1.ValidationError('', { errors: modifiedError }));
        }
        next();
    });
};
exports.default = validateMiddleware;
