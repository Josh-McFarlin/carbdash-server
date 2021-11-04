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
    const { id } = event.pathParameters;

    const restaurant = await actions.findRestaurantById(id);

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
 * Find Restaurants
 * @http GET
 */
export const findRestaurants: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { name, tags } = event.queryStringParameters || {};

    const restaurants = await actions.findRestaurants({
      name,
      tags: tags.split(","),
    });

    return Response.success({
      restaurants,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Restaurants!"
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
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);

    const restaurant = await actions.updateRestaurantById(id, body);

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
    const { id } = event.pathParameters;

    await actions.deleteRestaurantById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Restaurant!"
    );
  }
};
