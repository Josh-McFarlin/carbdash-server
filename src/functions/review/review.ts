import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/review";

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
    const review = await actions.createReview(body);

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
 * Find Reviews
 * @http GET
 */
export const findReviews: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    // const query = event.pathParameters;

    const reviews = await actions.findReviews();

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
 * Find Review By ID
 * @http GET
 */
export const findReviewById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const review = await actions.findReviewById(query.id);

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
 * Find Reviews By User
 * @http GET
 */
export const findReviewsByUser: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const reviews = await actions.findReviewsByUser(query.id);

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
 * Find Reviews By Restaurant
 * @http GET
 */
export const findReviewsByRestaurant: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const reviews = await actions.findReviewsByRestaurant(query.id);

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
 * Find Reviews By Tags
 * @http GET
 */
export const findReviewsByTags: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const reviews = await actions.findReviewsByTags(query.tags.split(","));

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
    const query = event.pathParameters;
    const body = JSON.parse(event.body);

    const review = await actions.updateReviewById(query.id, body);

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
    const query = event.pathParameters;

    await actions.deleteReviewById(query.id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Review!"
    );
  }
};
