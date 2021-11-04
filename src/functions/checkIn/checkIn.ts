import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/checkIn";

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
    const checkIn = await actions.createCheckIn(body);

    return Response.success({
      checkIn,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create CheckIn!"
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
    // const query = event.pathParameters;

    const checkIns = await actions.findCheckIns();

    return Response.success({
      checkIns,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find CheckIns!"
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
    const { id } = event.pathParameters;

    const checkIn = await actions.findCheckInById(id);

    return Response.success({
      checkIn,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find CheckIn!"
    );
  }
};

/**
 * Find CheckIns By User
 * @http GET
 */
export const findCheckInsByUser: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const checkIns = await actions.findCheckInsByUser(query.id);

    return Response.success({
      checkIns,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find CheckIns!"
    );
  }
};

/**
 * Find CheckIns By Restaurant
 * @http GET
 */
export const findCheckInsByRestaurant: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const checkIns = await actions.findCheckInsByRestaurant(query.id);

    return Response.success({
      checkIns,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find CheckIns!"
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
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);

    const checkIn = await actions.updateCheckInById(id, body);

    return Response.success({
      checkIn,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update CheckIn!"
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
    const { id } = event.pathParameters;

    await actions.deleteCheckInById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete CheckIn!"
    );
  }
};
