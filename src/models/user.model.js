"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
// Utils
const validate_1 = require("@/utils/validate");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: [8, 'Minimum of letter is 8'],
    },
    media: {
        type: Array,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    tokens: {
        accessToken: { type: String },
        refreshToken: { type: String },
        accessTokenExpireAt: { type: Date },
        refreshTokenExpireAt: { type: Date },
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('User', userSchema);
/**
 *  Validation schema
 */
const validationSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(20).required(),
});
const loginSchema = validationSchema.fork(['lastName', 'firstName'], (Schema) => Schema.optional());
function validateSchema(type) {
    return function (user) {
        if (type === 'signup')
            return (0, validate_1.customValidate)(validationSchema, user);
        return (0, validate_1.customValidate)(loginSchema, user);
    };
}
exports.validateSchema = validateSchema;
