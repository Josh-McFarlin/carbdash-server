import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/restaurant";
import "../../database";

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
    const id = decodeURIComponent(event.pathParameters.id);

    const restaurant = await actions.findRestaurantById(id);

    if (restaurant == null) {
      throw new Error("Restaurant does not exist!");
    }

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
    const { latitude, longitude, name, tags, page, perPage } =
      event.queryStringParameters || {};

    if (latitude == null || longitude == null) {
      throw new Error("Coordinates must be provided in request!");
    }

    const restaurants = await actions.findRestaurants({
      coordinates: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      name,
      tags: tags?.split(","),
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
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
    const id = decodeURIComponent(event.pathParameters.id);
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
    const id = decodeURIComponent(event.pathParameters.id);

    await actions.deleteRestaurantById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Restaurant!"
    );
  }
};
