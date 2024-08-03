"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.FRONT_URL = exports.JWT_SECRET = exports.SESSION_SECRET = exports.CLIENT_ID = exports.BASE_URL = exports.API_VERSION = exports.isProd = exports.ENVIRONMENT = void 0;
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
if (fs_1.default.existsSync('.env')) {
    logger_1.default.debug('Using .env file to supply config environment variables');
    dotenv_1.default.config({ path: '.env' });
}
else {
    logger_1.default.debug('Using .env.example file to supply config environment variables');
    dotenv_1.default.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}
exports.ENVIRONMENT = process.env.NODE_ENV;
exports.isProd = exports.ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
exports.API_VERSION = exports.isProd
    ? process.env['BASE_API_VERSION']
    : process.env['BASE_API_VERSION_LOCAL'];
exports.BASE_URL = exports.isProd ? process.env['BASE_URL'] : process.env['BASE_URL_LOCAL'];
exports.CLIENT_ID = process.env['CLIENT_ID'];
exports.SESSION_SECRET = process.env['SESSION_SECRET'];
exports.JWT_SECRET = process.env['JWT_SECRET'];
exports.FRONT_URL = (exports.isProd ? process.env['FRONT_URL'] : process.env['FRONT_URL_LOCAL']);
exports.MONGODB_URI = (exports.isProd ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL']);
if (!exports.SESSION_SECRET || !exports.JWT_SECRET) {
    logger_1.default.error('No client secret. Set SESSION_SECRET or JWT_SECRET environment variable.');
    process.exit(1);
}
if (!exports.MONGODB_URI) {
    if (exports.isProd) {
        logger_1.default.error('No mongo connection string. Set MONGODB_URI environment variable.');
    }
    else {
        logger_1.default.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
    }
    process.exit(1);
}
