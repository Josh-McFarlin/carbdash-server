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
    const id = decodeURIComponent(event.pathParameters.id);
    const { type } = event.queryStringParameters || {};

    if (type === "USER") {
      const user = await actions.findUserByAuth(id);

      return Response.success({
        auth: {
          ...user,
          followers: user?.followers
            ? Object.keys(user?.followers).length || 0
            : 0,
          following: user?.following
            ? Object.keys(user?.following).length || 0
            : 0,
          saved: user?.saved ? Object.keys(user?.saved).length || 0 : 0,
        },
      });
    } else if (type === "RESTAURANT") {
      const restaurant = await actions.findRestaurantByAuth(id);

      return Response.success({
        auth: {
          ...restaurant,
          followers: restaurant?.followers?.size || 0,
        },
      });
    } else {
      throw new Error("Invalid auth type!");
    }
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find User!",
      error?.message || error
    );
  }
};
