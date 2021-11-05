import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/recent";
import "../../database";

/**
 * Find Recent
 * @http GET
 */
export const findRecent: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { user, page, perPage } = event.queryStringParameters || {};

    const recent = await actions.findRecent({
      user,
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
    });

    return Response.success({
      recent,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find recent!"
    );
  }
};
