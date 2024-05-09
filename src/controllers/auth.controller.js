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
exports.verfiy = exports.google = exports.signup = exports.login = void 0;
// Utils
const secrets_1 = require("@/utils/secrets");
// Services
const auth_service_1 = __importDefault(require("@/services/auth.service"));
const response_service_1 = require("@/services/response.service");
// POST /auth/login
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield auth_service_1.default.loginService(req.body);
        next(new response_service_1.SuccessResponse('response_messages.login_successfully', userData));
    }
    catch (error) {
        next(new response_service_1.UnauthorizedError(error.message || 'response_messages.incorrect_email_or_password', error));
    }
});
exports.login = login;
// POST /auth/signup
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield auth_service_1.default.signupService(req.body);
        next(new response_service_1.CreateResponse('response_messages.sign_up_successfully'));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message));
    }
});
exports.signup = signup;
// POST /auth/google/callback
const google = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAccessToken = yield auth_service_1.default.socialService(req.user._json);
        res.cookie('accessToken', userAccessToken);
        res.redirect(`${secrets_1.FRONT_URL}`);
    }
    catch (error) {
        next(new response_service_1.BadRequestError('response_messages.faild_to_authorize_user', error));
    }
});
exports.google = google;
// GET /auth/verfiy
const verfiy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resMessage = yield auth_service_1.default.verfiyService(req.params.email, req.params.token);
        next(new response_service_1.SuccessResponse(resMessage));
    }
    catch (error) {
        next(new response_service_1.BadRequestError(error.message, error));
    }
});
exports.verfiy = verfiy;
