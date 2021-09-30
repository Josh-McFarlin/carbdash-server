import { APIGatewayProxyResult } from "aws-lambda";
import { ResponseBody, StatusCode } from "../types/Response";

export default class Response implements ResponseBody {
  readonly statusCode: StatusCode;
  readonly message: string;
  readonly error: boolean;
  readonly data: ResponseBody["data"];

  constructor(
    statusCode: StatusCode,
    message: string,
    error: boolean,
    data?: ResponseBody["data"]
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.data = data;
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
      }),
    };
  }

  static success(data?: ResponseBody["data"]): APIGatewayProxyResult {
    const response = new Response(StatusCode.Success, "Success.", false, data);

    return response.serialize();
  }

  static error(statusCode: StatusCode, message: string): APIGatewayProxyResult {
    const response = new Response(statusCode, message, true);

    return response.serialize();
  }
}
