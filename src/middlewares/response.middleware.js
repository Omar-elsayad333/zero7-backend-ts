"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// uuid
const uuid_1 = require("uuid");
// Utils
const logger_1 = __importDefault(require("@/utils/logger"));
function default_1(createdResponse, req, res, next) {
    let errorId = (0, uuid_1.v4)();
    const isError = createdResponse.statusCode > 399;
    if (isError)
        logger_1.default.error({ errorId, source: createdResponse.data });
    res.status(createdResponse.statusCode).json(Object.assign(Object.assign(Object.assign({}, (isError && { errorId })), { status: isError ? res.__('response_status.error') : res.__('response_status.success'), statusCode: createdResponse.statusCode, message: res.__(createdResponse.message) }), (createdResponse.data && { data: createdResponse.data })));
}
exports.default = default_1;
