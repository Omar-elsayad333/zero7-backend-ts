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
exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
// Utils
const validate_1 = require("../utils/validate");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    genderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Gender',
        required: true,
    },
    colors: [
        {
            colorId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: true,
                ref: 'Color',
            },
            sizes: [
                {
                    sizeId: {
                        ref: 'Size',
                        type: mongoose_1.default.Schema.Types.ObjectId,
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        requierd: true,
                    },
                },
            ],
            images: [
                {
                    url: {
                        type: String,
                        required: true,
                    },
                    name: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    ],
    ratings: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            value: {
                type: Number,
                required: true,
                min: 1,
                max: 5,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model('Product', productSchema);
/**
 *  Validation schema
 */
const validationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    categoryId: joi_1.default.string().required(),
    genderId: joi_1.default.string().required(),
    colors: joi_1.default
        .array()
        .items(joi_1.default.object({
        colorId: joi_1.default.string().required(),
        sizes: joi_1.default
            .array()
            .items(joi_1.default.object({
            sizeId: joi_1.default.string().required(),
            quantity: joi_1.default.number().required(),
        }))
            .required(),
        images: joi_1.default
            .array()
            .items(joi_1.default.object({
            url: joi_1.default.string().required(),
            name: joi_1.default.string().required(),
        }))
            .required(),
    }))
        .required(),
});
const updateSchema = validationSchema.fork([], // fields to include (if empty it inclouds all)
(schema) => schema.optional());
function validate(type) {
    return function (category) {
        if (type === 'create')
            return (0, validate_1.customValidate)(validationSchema, category);
        return (0, validate_1.customValidate)(updateSchema, category);
    };
}
exports.validate = validate;
