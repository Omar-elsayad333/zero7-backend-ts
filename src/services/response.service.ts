/**
 * RESPONSE BASE CLASS
 */

export default abstract class ApiResponse extends Error {
  constructor(readonly statusCode: number, readonly message: string, readonly source?: IError) {
    super()
  }
}

/**
 *  ERROR RESPONSES
 */

interface IError extends Error {
  id?: string
}

export class NotFoundError extends ApiResponse {
  constructor(readonly message: string = 'Not Found', source?: IError) {
    super(404, message, source)
  }
}

export class ForbiddenError extends ApiResponse {
  constructor(readonly message: string = 'Forbidden', source?: IError) {
    super(403, message, source)
  }
}

export class InternalServerError extends ApiResponse {
  constructor(readonly message: string = 'Internal Server Error', source?: IError) {
    super(500, message, source)
  }
}

export class UnauthorizedError extends ApiResponse {
  constructor(readonly message: string = 'Unauthorized Request', source?: IError) {
    super(401, message, source)
  }
}

export class BadRequestError extends ApiResponse {
  constructor(readonly message: string = 'Bad Request', source?: IError) {
    super(400, message, source)
  }
}

export class ValidationError extends ApiResponse {
  constructor(readonly message: string = 'Bad Request', source?: IError) {
    super(422, message, source)
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
