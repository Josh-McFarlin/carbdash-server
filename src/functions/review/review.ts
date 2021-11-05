import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/review";
import { createUploadUrl } from "../../utils/s3";
import "../../database";

/**
 * Create a new Review
 * @http POST
 */
export const createReview: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);
    const photoUrls = await Promise.all(
      Array.from(Array(body.photoUrls.length)).map(createUploadUrl)
    );
    const review = await actions.createReview({
      ...body,
      photoUrls,
      user: event.requestContext.authorizer.principalId,
    });

    return Response.success({
      review,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Review!"
    );
  }
};

/**
 * Find Review By ID
 * @http GET
 */
export const findReviewById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;

    const review = await actions.findReviewById(id);

    return Response.success({
      review,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Review!"
    );
  }
};

/**
 * Find Reviews
 * @http GET
 */
export const findReviews: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { user, restaurant, tags, page, perPage } =
      event.queryStringParameters || {};

    const reviews = await actions.findReviews({
      user,
      restaurant,
      tags: tags?.split(","),
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
    });

    return Response.success({
      reviews,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Reviews!"
    );
  }
};

/**
 * Update Review By ID
 * @http POST
 */
export const updateReviewById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);

    const review = await actions.updateReviewById(id, body);

    return Response.success({
      review,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update Review!"
    );
  }
};

/**
 * Delete Review By ID
 * @http DELETE
 */
export const deleteReviewById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;

    await actions.deleteReviewById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Review!"
    );
  }
};
