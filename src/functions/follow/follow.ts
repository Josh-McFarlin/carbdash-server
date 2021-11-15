import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/follow";
import "../../database";

/**
 * Create a new Follow
 * @http POST
 */
export const createFollow: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);
    const follow = await actions.createFollow({
      ...body,
      from: event.requestContext.authorizer.principalId,
    });

    return Response.success({
      follow,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Follow!"
    );
  }
};

/**
 * Find Follows
 * @http GET
 */
export const findFollows: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { fromType, from, toType, to, simpleType, page, perPage } =
      event.queryStringParameters || {};

    if (!from && !to) {
      throw new Error("A from or to must be supplied!");
    }

    const isSimple = simpleType != null;

    const follows = await actions.findFollows({
      fromType: fromType as any,
      from,
      toType: toType as any,
      to,
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
    });

    return Response.success({
      follows: isSimple
        ? simpleType === "from"
          ? follows.map((i) => i.from)
          : follows.map((i) => i.to)
        : follows,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Follows!"
    );
  }
};

/**
 * Delete Follow By ID
 * @http DELETE
 */
export const deleteFollowById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const id = decodeURIComponent(event.pathParameters.id);

    await actions.deleteFollowById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Follow!"
    );
  }
};
