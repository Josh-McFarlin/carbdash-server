import { APIGatewayProxyResult } from "aws-lambda";
import { ResponseBody, StatusCode } from "../types/Response";

export default class Response implements ResponseBody {
  readonly statusCode: StatusCode;
  readonly message: string;
  readonly error: boolean;
  readonly data: ResponseBody["data"];
  readonly errorMessage: string | null;

  constructor(
    statusCode: StatusCode,
    message: string,
    error: boolean,
    data?: ResponseBody["data"],
    errorMessage?: string
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.data = data;
    this.errorMessage = errorMessage;
  }

  /**
   * Serialize the response body to string
   */
  serialize(): APIGatewayProxyResult {
    return {
      statusCode: StatusCode.Success,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        statusCode: this.statusCode,
        message: this.message,
        error: this.error,
        data: this.data,
        errorMessage: this.errorMessage,
      }),
    };
  }

  static success(data?: ResponseBody["data"]): APIGatewayProxyResult {
    const response = new Response(StatusCode.Success, "Success.", false, data);

    return response.serialize();
  }

  static error(
    statusCode: StatusCode,
    message: string,
    errorMessage?: string
  ): APIGatewayProxyResult {
    const response = new Response(
      statusCode,
      message,
      true,
      null,
      errorMessage
    );

    return response.serialize();
  }
}
