import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/follow";
import "../../database";
import { AccountRefType } from "../../types/AccountRef";

/**
 * Find Follows
 * @http GET
 */
export const findFollowsById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id, format } = event.queryStringParameters || {};

    const follows = await actions.findFollowsById(
      id || event.requestContext.authorizer.principalId,
      format === "detailed"
    );

    return Response.success({
      follows:
        format === "simple"
          ? {
              followers: (follows.followers as AccountRefType[]).map(
                (i: AccountRefType) => i.ref.toString()
              ),
              following: (follows.following as AccountRefType[]).map(
                (i: AccountRefType) => i.ref.toString()
              ),
            }
          : follows,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Follows!",
      error?.message || error
    );
  }
};

/**
 * Toggle a Follow
 * @http POST
 */
export const toggleFollow: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { followType, followId } = JSON.parse(event.body);
    const user = await actions.toggleFollowById(
      event.requestContext.authorizer.principalId,
      followType,
      followId
    );

    return Response.success({
      user: {
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
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Follow!",
      error?.message || error
    );
  }
};
