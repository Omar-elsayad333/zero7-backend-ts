"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileExt = exports.generateUniqueSuffix = void 0;
const generateUniqueSuffix = (fileExt) => {
    return `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExt}`;
};
exports.generateUniqueSuffix = generateUniqueSuffix;
const generateFileExt = (file) => {
    var _a;
    return (_a = file.mimetype) === null || _a === void 0 ? void 0 : _a.split('/')[1];
};
exports.generateFileExt = generateFileExt;
