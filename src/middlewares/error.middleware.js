"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_service_1 = require("@/services/response.service");
// uuid
const uuid_1 = require("uuid");
const errorMiddleware = (req, res, next) => {
    try {
        next();
    }
    catch (error) {
        let errorId = (0, uuid_1.v4)();
        if (error instanceof response_service_1.NotFoundError) {
        }
        return res.status(error.statusCode).json(Object.assign({ errorId, status: res.__('response_status.error'), statusCode: error.statusCode, message: res.__(error.message) }, (error.data && { data: error.data })));
    }
};
exports.default = errorMiddleware;
// let errorId = uuidv4()
// const isError = createdResponse.statusCode > 399
// if (isError) logger.error({ errorId, source: createdResponse.data })
// res.status(createdResponse.statusCode).json({
//   ...(isError && { errorId }),
//   status: isError ? res.__('response_status.error') : res.__('response_status.success'),
//   statusCode: createdResponse.statusCode,
//   message: res.__(createdResponse.message),
//   ...(createdResponse.data && { data: createdResponse.data }),
// })
