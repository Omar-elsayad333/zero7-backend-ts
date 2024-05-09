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
exports.db = exports.connectDB = void 0;
// Mongoose
const mongoose_1 = __importDefault(require("mongoose"));
// Utils
const secrets_1 = require("@/utils/secrets");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoUrl = secrets_1.MONGODB_URI;
        yield mongoose_1.default.connect(mongoUrl.toString());
    }
    catch (error) {
        console.log('error listing', error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
const db = mongoose_1.default.connection;
exports.db = db;
