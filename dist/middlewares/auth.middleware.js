"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3rd party libs
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Utils
const secrets_1 = require("../utils/secrets");
// Services
const response_service_1 = require("../services/response.service");
const authMiddleware = (req, res, next) => {
    var _a;
    try {
        // Extract the token from request headers or wherever you are passing it
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return next(new response_service_1.UnauthorizedError('response_messages.user_not_authorized'));
        // Verify req token
        const decodedToken = jsonwebtoken_1.default.verify(token, secrets_1.JWT_SECRET);
        if (!(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id))
            return next(new response_service_1.UnauthorizedError('response_messages.user_not_authorized'));
        req.token = token;
        req.userId = decodedToken._id;
        next();
    }
    catch (error) {
        next(new response_service_1.UnauthorizedError('response_messages.user_not_authorized'));
    }
};
exports.default = authMiddleware;
