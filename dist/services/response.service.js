"use strict";
/**
 * RESPONSE BASE CLASS
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoContentResponse = exports.RequestAcceptedResponse = exports.CreateResponse = exports.SuccessResponse = exports.ValidationError = exports.BadRequestError = exports.UnauthorizedError = exports.InternalServerError = exports.ForbiddenError = exports.NotFoundError = void 0;
class ApiResponse extends Error {
    constructor(statusCode, message, data) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
exports.default = ApiResponse;
/**
 *  ERROR RESPONSES
 */
class NotFoundError extends ApiResponse {
    constructor(message = 'Not Found', data) {
        super(404, message, data);
        this.message = message;
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends ApiResponse {
    constructor(message = 'Forbidden', data) {
        super(403, message, data);
        this.message = message;
    }
}
exports.ForbiddenError = ForbiddenError;
class InternalServerError extends ApiResponse {
    constructor(message = 'Internal Server Error', data) {
        super(500, message, data);
        this.message = message;
    }
}
exports.InternalServerError = InternalServerError;
class UnauthorizedError extends ApiResponse {
    constructor(message = 'Unauthorized Request', data) {
        super(401, message, data);
        this.message = message;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class BadRequestError extends ApiResponse {
    constructor(message = 'Bad Request', data) {
        super(400, message, data);
        this.message = message;
    }
}
exports.BadRequestError = BadRequestError;
class ValidationError extends ApiResponse {
    constructor(message = 'Bad Request', data) {
        super(422, message, data);
        this.message = message;
    }
}
exports.ValidationError = ValidationError;
/**
 *  SUCCESS RESPONSES
 */
class SuccessResponse extends ApiResponse {
    constructor(message = 'success', data) {
        super(200, message, data);
        this.message = message;
    }
}
exports.SuccessResponse = SuccessResponse;
class CreateResponse extends ApiResponse {
    constructor(message = 'created successfully', data) {
        super(201, message, data);
        this.message = message;
    }
}
exports.CreateResponse = CreateResponse;
class RequestAcceptedResponse extends ApiResponse {
    constructor(message = 'request accepted', data) {
        super(202, message, data);
        this.message = message;
    }
}
exports.RequestAcceptedResponse = RequestAcceptedResponse;
class NoContentResponse extends ApiResponse {
    constructor(message = 'success', data) {
        super(204, message, data);
        this.message = message;
    }
}
exports.NoContentResponse = NoContentResponse;
