import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/auth";
import "../../database";

/**
 * Find User By Auth
 * @http GET
 */
export const findUserByAuth: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;
    const { type } = event.queryStringParameters || {};

    if (type === "USER") {
      const auth = await actions.findUserByAuth(id);

      return Response.success({
        auth,
      });
    } else if (type === "RESTAURANT") {
      const auth = await actions.findRestaurantByAuth(id);

      return Response.success({
        auth,
      });
    } else {
      throw new Error("Invalid auth type!");
    }
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find User!"
    );
  }
};
