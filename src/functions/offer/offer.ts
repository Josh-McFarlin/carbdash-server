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
    const offer = await actions.createOffer(body);

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
    const { id } = event.pathParameters;

    const offer = await actions.findOfferById(id);

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
    const { restaurant } = event.queryStringParameters || {};

    const offers = await actions.findOffers({
      restaurant,
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
    const { id } = event.pathParameters;
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
    const { id } = event.pathParameters;

    await actions.deleteOfferById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Offer!"
    );
  }
};
