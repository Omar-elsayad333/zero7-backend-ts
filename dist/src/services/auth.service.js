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
const bcrypt_1 = require("bcrypt");
// 3rd party libs
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Models
const user_model_1 = __importDefault(require("../models/user.model"));
// Config
const nodemailer_1 = __importDefault(require("../config/nodemailer"));
// Utils
const hash_1 = require("../utils/hash");
const secrets_1 = require("../utils/secrets");
const tokens_1 = require("../utils/tokens");
const loginService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const user = yield user_model_1.default.findOne({
        $or: [{ email }, { phoneNumber: email }],
    });
    if (!user) {
        throw new Error('response_messages.incorrect_email_or_password');
    }
    const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
    if (!passwordMatch) {
        throw new Error('response_messages.incorrect_email_or_password');
    }
    if (!user.isVerified) {
        const emailToken = (0, tokens_1.createAccesToken)({ _id: user._id });
        (0, nodemailer_1.default)({
            name: user.name,
            to: `${user.email}`,
            subject: 'Email Verification',
            link: `${secrets_1.FRONT_URL}/verfiy-email/${user.email}/${emailToken}`,
        });
        throw new Error('response_messages.email_not_verified');
    }
    // Create new tokens for user
    user.tokens = (0, tokens_1.createUserTokens)(user._id);
    // Save the new tokens to the user
    yield user.save();
    const responseData = {
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isBanned: user.isBanned,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        tokens: user.tokens,
    };
    return responseData;
});
const signupService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = body;
    if (email) {
        const emailExists = yield user_model_1.default.findOne({ email });
        if (emailExists) {
            throw new Error('response_messages.email_already_in_use');
        }
    }
    const hash = yield (0, hash_1.hashPassword)(password);
    const userData = {
        firstName,
        lastName,
        email,
        isAdmin: true,
        password: hash,
        name: `${firstName} ${lastName}`,
    };
    const user = yield user_model_1.default.create(Object.assign({}, userData));
    const emailToken = (0, tokens_1.createAccesToken)({ _id: user._id });
    (0, nodemailer_1.default)({
        to: `${email}`,
        name: userData.name,
        subject: 'Email Verification',
        link: `${secrets_1.FRONT_URL}/verfiy-email/${email}/${emailToken}`,
    });
});
const socialService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, given_name, family_name, email, picture, locale } = body;
    if (!email)
        throw new Error('response_messages.faild_to_authorize_user');
    const user = yield user_model_1.default.findOne({ email });
    if (user) {
        // login user
        const userTokens = (0, tokens_1.createUserTokens)(user._id);
        user.tokens = userTokens;
        yield user.save();
        return userTokens.accessToken;
    }
    // create new user
    const userData = {
        name: name,
        firstName: given_name,
        lastName: family_name,
        email,
        media: [{ name: 'avatar', path: picture }],
        isAdmin: true,
    };
    const createdUser = yield user_model_1.default.create(Object.assign({}, userData));
    const userTokens = (0, tokens_1.createUserTokens)(createdUser._id);
    yield createdUser.save();
    return userTokens.accessToken;
});
const verfiyService = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !token)
        throw new Error('response_messages.faild_to_verfiy_user_email');
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        throw new Error('response_messages.faild_to_verfiy_user_email');
    const decodedToken = jsonwebtoken_1.default.verify(token, secrets_1.JWT_SECRET);
    if (decodedToken._id !== user._id)
        throw new Error('response_messages.faild_to_verfiy_user_email');
    yield user_model_1.default.findOneAndUpdate({ email }, { isVerified: true });
    return 'response_messages.verify_email_successfully';
});
exports.default = {
    loginService,
    signupService,
    socialService,
    verfiyService,
};
