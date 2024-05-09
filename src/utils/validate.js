"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customValidate = void 0;
const customValidate = (schema, data) => {
    return schema.validate(data, { abortEarly: false });
};
exports.customValidate = customValidate;
