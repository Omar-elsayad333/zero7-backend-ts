/**
 * RESPONSE BASE CLASS
 */

export default abstract class ApiResponse extends Error {
  constructor(readonly statusCode: number, readonly message: string, readonly data?: any) {
    super()
  }
}

/**
 *  ERROR RESPONSES
 */

export class NotFoundError extends ApiResponse {
  constructor(readonly message: string = 'Not Found', data?: any) {
    super(404, message, data)
  }
}

export class ForbiddenError extends ApiResponse {
  constructor(readonly message: string = 'Forbidden', data?: any) {
    super(403, message, data)
  }
}

export class InternalServerError extends ApiResponse {
  constructor(readonly message: string = 'Internal Server Error', data?: any) {
    super(500, message, data)
  }
}

export class UnauthorizedError extends ApiResponse {
  constructor(readonly message: string = 'Unauthorized Request', data?: any) {
    super(401, message, data)
  }
}

export class BadRequestError extends ApiResponse {
  constructor(readonly message: string = 'Bad Request', data?: any) {
    super(400, message, data)
  }
}

export class ValidationError extends ApiResponse {
  constructor(readonly message: string = 'Bad Request', data?: any) {
    super(422, message, data)
  }
}

/**
 *  SUCCESS RESPONSES
 */

export class SuccessResponse extends ApiResponse {
  constructor(readonly message: string = 'success', data?: any) {
    super(200, message, data)
  }
}

export class CreateResponse extends ApiResponse {
  constructor(readonly message: string = 'created successfully', data?: any) {
    super(201, message, data)
  }
}

export class RequestAcceptedResponse extends ApiResponse {
  constructor(readonly message: string = 'request accepted', data?: any) {
    super(202, message, data)
  }
}

export class NoContentResponse extends ApiResponse {
  constructor(readonly message: string = 'success', data?: any) {
    super(204, message, data)
  }
}
