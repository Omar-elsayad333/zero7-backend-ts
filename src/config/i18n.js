"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const i18n_1 = __importDefault(require("i18n"));
i18n_1.default.configure({
    // setup some locales - other locales default to en silently
    locales: ['en', 'ar'],
    // sets a custom cookie name to parse locale settings from
    header: 'locale',
    // sets a default value
    defaultLocale: 'en',
    // where to store json files - defaults to './locales'
    directory: path_1.default.join(__dirname, '..', 'locales'),
    // Support for nested translation objects
    objectNotation: true,
});
exports.default = i18n_1.default;
