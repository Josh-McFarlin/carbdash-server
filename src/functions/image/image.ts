import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import { createUploadUrl } from "../../utils/s3";

/**
 * Get
 * @http Get an image upload URL
 */
export const uploadImage: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const contentTypes = decodeURIComponent(
      event?.queryStringParameters?.contentTypes || ""
    );

    const photoUrls = await Promise.all(
      contentTypes?.split(",").map((type) => createUploadUrl(type))
    );

    return Response.success({
      photoUrls,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create image url!",
      error?.message || error
    );
  }
};
