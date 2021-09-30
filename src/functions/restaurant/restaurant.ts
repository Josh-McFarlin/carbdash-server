import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/restaurant";

/**
 * Create a new Restaurant
 * @http POST
 */
export const createRestaurant: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);
    const restaurant = await actions.createRestaurant(body);

    return Response.success({
      restaurant,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Restaurant!"
    );
  }
};

/**
 * Find Restaurant By ID
 * @http GET
 */
export const findRestaurantById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const restaurant = await actions.findRestaurantById(query.id);

    return Response.success({
      restaurant,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Restaurant!"
    );
  }
};

/**
 * Find Restaurant By email
 * @http GET
 */
export const findRestaurantByEmail: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const restaurant = await actions.findRestaurantByEmail(query.email);

    return Response.success({
      restaurant,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Restaurant!"
    );
  }
};

/**
 * Update Restaurant By ID
 * @http POST
 */
export const updateRestaurantById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;
    const body = JSON.parse(event.body);

    const restaurant = await actions.updateRestaurantById(query.id, body);

    return Response.success({
      restaurant,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update Restaurant!"
    );
  }
};

/**
 * Delete Restaurant By ID
 * @http DELETE
 */
export const deleteRestaurantById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    await actions.deleteRestaurantById(query.id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Restaurant!"
    );
  }
};
