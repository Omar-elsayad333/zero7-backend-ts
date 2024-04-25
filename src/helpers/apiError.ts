interface IError extends Error {
  id?: string
}

export default class ApiError extends Error {
  constructor(readonly statusCode: number, readonly message: string, readonly source?: IError) {
    super()
  }
}

export class NotFoundError extends ApiError {
  constructor(readonly message: string = 'Not Found', source?: IError) {
    super(404, message, source)
  }
}

export class ForbiddenError extends ApiError {
  constructor(readonly message: string = 'Forbidden', source?: IError) {
    super(403, message, source)
  }
}

export class InternalServerError extends ApiError {
  constructor(readonly message: string = 'Internal Server Error', source?: IError) {
    super(500, message, source)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(readonly message: string = 'Unauthorized Request', source?: IError) {
    super(401, message, source)
  }
}

export class BadRequestError extends ApiError {
  constructor(readonly message: string = 'Bad Request', source?: IError) {
    super(400, message, source)
  }
}

export class ValidationError extends ApiError {
  constructor(readonly message: string = 'Bad Request', source?: IError) {
    super(422, message, source)
  }
}
