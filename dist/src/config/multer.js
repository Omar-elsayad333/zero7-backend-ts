"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryUpload = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const generate_1 = require("../utils/generate");
// Storing files on disk storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images');
    },
    filename: function (req, file, cb) {
        const fileExt = (0, generate_1.generateFileExt)(file);
        const uniqueSuffix = (0, generate_1.generateUniqueSuffix)(fileExt);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.upload = upload;
// Storing files on memory
const memoryStorage = multer_1.default.memoryStorage();
const memoryUpload = (0, multer_1.default)({ storage: memoryStorage });
exports.memoryUpload = memoryUpload;
