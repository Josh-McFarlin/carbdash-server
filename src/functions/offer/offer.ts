import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/offer";
import "../../database";

/**
 * Create a new Offer
 * @http POST
 */
export const createOffer: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);

    const offer = await actions.createOffer({
      ...body,
      restaurant: event.requestContext.authorizer.principalId,
    });

    return Response.success({
      offer,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Offer!"
    );
  }
};

/**
 * Find Offer By ID
 * @http GET
 */
export const findOfferById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const id = decodeURIComponent(event.pathParameters.id);

    const offer = await actions.findOfferById(id);

    if (offer == null) {
      throw new Error("Offer does not exist!");
    }

    return Response.success({
      offer,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Offer!"
    );
  }
};

/**
 * Find Offers
 * @http GET
 */
export const findOffers: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { latitude, longitude, restaurant, page, perPage } =
      event.queryStringParameters || {};

    if (latitude == null || longitude == null) {
      throw new Error("Coordinates must be provided in request!");
    }

    const offers = await actions.findOffers({
      coordinates: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      restaurant,
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
    });

    return Response.success({
      offers,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Offers!"
    );
  }
};

/**
 * Update Offer By ID
 * @http POST
 */
export const updateOfferById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const id = decodeURIComponent(event.pathParameters.id);
    const body = JSON.parse(event.body);

    const offer = await actions.updateOfferById(id, body);

    return Response.success({
      offer,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update Offer!"
    );
  }
};

/**
 * Delete Offer By ID
 * @http DELETE
 */
export const deleteOfferById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const id = decodeURIComponent(event.pathParameters.id);

    await actions.deleteOfferById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Offer!"
    );
  }
};
