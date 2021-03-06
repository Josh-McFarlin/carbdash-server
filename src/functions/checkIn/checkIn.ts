import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/checkIn";
import "../../database";

/**
 * Create a new CheckIn
 * @http POST
 */
export const createCheckIn: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);
    const checkIn = await actions.createCheckIn({
      ...body,
      user: event.requestContext.authorizer.principalId,
    });

    return Response.success({
      checkIn: {
        ...checkIn,
        likedBy: checkIn.likedBy
          ? Object.values(checkIn?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      },
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create CheckIn!",
      error?.message || error
    );
  }
};

/**
 * Find CheckIn By ID
 * @http GET
 */
export const findCheckInById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const id = decodeURIComponent(event.pathParameters.id);

    const checkIn = await actions.findCheckInById(id);

    if (checkIn == null) {
      throw new Error("CheckIn does not exist!");
    }

    return Response.success({
      checkIn: {
        ...checkIn,
        likedBy: checkIn.likedBy
          ? Object.values(checkIn?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      },
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find CheckIn!",
      error?.message || error
    );
  }
};

/**
 * Find CheckIns
 * @http GET
 */
export const findCheckIns: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { user, restaurant, tags, page, perPage } =
      event.queryStringParameters || {};

    const checkIns = await actions.findCheckIns({
      user,
      restaurant,
      tags: tags?.split(","),
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
    });

    return Response.success({
      checkIns: checkIns.map((checkIn) => ({
        ...checkIn,
        likedBy: checkIn.likedBy
          ? Object.values(checkIn?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      })),
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find CheckIns!",
      error?.message || error
    );
  }
};

/**
 * Update CheckIn By ID
 * @http POST
 */
export const updateCheckInById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const id = decodeURIComponent(event.pathParameters.id);
    const body = JSON.parse(event.body);

    const checkIn = await actions.updateCheckInById(id, body);

    return Response.success({
      checkIn: {
        ...checkIn,
        likedBy: checkIn.likedBy
          ? Object.values(checkIn?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      },
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update CheckIn!",
      error?.message || error
    );
  }
};

/**
 * Delete CheckIn By ID
 * @http DELETE
 */
export const deleteCheckInById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const id = decodeURIComponent(event.pathParameters.id);

    await actions.deleteCheckInById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete CheckIn!",
      error?.message || error
    );
  }
};
