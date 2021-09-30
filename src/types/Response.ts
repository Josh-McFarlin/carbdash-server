export enum StatusCode {
  Success = 200,
  BadRequest = 400,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export abstract class ResponseBody {
  readonly statusCode!: StatusCode;
  readonly message!: string;
  readonly data?: Record<string | number, unknown>;
}
