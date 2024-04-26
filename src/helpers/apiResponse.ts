export default abstract class ApiResponse {
  constructor(readonly statusCode: number, readonly message: string, readonly data?: any) {}
}

export class SuccessResponse extends ApiResponse {
  constructor(readonly message: string = 'success', data?: any) {
    super(200, message, data)
  }
}

export class CreatedResponse extends ApiResponse {
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
