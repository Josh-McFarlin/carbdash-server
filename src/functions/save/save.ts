import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/save";
import "../../database";
import { SaveRefType } from "../../types/SaveRef";

/**
 * Find Saves
 * @http GET
 */
export const findSavesById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id, format, filter } = event.queryStringParameters || {};

    const saves = await actions.findSavedById(
      id || event.requestContext.authorizer.principalId,
      format === "detailed",
      filter as any
    );

    return Response.success({
      saves:
        format === "simple"
          ? (saves as SaveRefType[]).map((i: SaveRefType) => i.ref.toString())
          : saves,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Saves!",
      error?.message || error
    );
  }
};

/**
 * Toggle a Save
 * @http POST
 */
export const toggleSave: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { contentType, content } = JSON.parse(event.body);
    const user = await actions.toggleSaveById(
      event.requestContext.authorizer.principalId,
      contentType,
      content
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
      "Unable to create Save!",
      error?.message || error
    );
  }
};
