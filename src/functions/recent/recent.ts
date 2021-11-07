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
    const { latitude, longitude, tags, users, page, perPage } =
      event.queryStringParameters || {};

    if ((latitude == null) != (longitude == null)) {
      throw new Error(
        "Coordinates must be excluded or include both latitude and longitude in request!"
      );
    }

    const recent = await actions.findRecent({
      tags: tags?.split(","),
      ...(latitude != null && {
        coordinates: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      }),
      users: users?.split(","),
      restaurants: users?.split(","),
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
