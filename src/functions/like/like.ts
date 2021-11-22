import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/like";
import "../../database";

/**
 * Toggle a Like
 * @http POST
 */
export const toggleLike: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { contentType, contentId } = JSON.parse(event.body);
    const content = await actions.toggleLikeById(
      event.requestContext.authorizer.principalId,
      contentType,
      contentId
    );

    return Response.success({
      content: {
        ...content,
        likedBy: content.likedBy
          ? Object.values(content?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      },
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Like!",
      error?.message || error
    );
  }
};
