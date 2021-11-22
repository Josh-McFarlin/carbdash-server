import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/review";
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

    const review = await actions.createReview({
      ...body,
      user: event.requestContext.authorizer.principalId,
    });

    return Response.success({
      review: {
        ...review,
        likedBy: review.likedBy
          ? Object.values(review?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      },
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Review!",
      error?.message || error
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
    const id = decodeURIComponent(event.pathParameters.id);

    const review = await actions.findReviewById(id);

    if (review == null) {
      throw new Error("Review does not exist!");
    }

    return Response.success({
      review: {
        ...review,
        likedBy: review.likedBy
          ? Object.values(review?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      },
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Review!",
      error?.message || error
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

    if (restaurant != null) {
      const summary = await actions.summarizeReviewsByRestaurant(restaurant);

      return Response.success(summary);
    }

    const reviews = await actions.findReviews({
      user,
      restaurant,
      tags: tags?.split(","),
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
    });

    return Response.success({
      reviews: reviews.map((review) => ({
        ...review,
        likedBy: review.likedBy
          ? Object.values(review?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      })),
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Reviews!",
      error?.message || error
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
    const id = decodeURIComponent(event.pathParameters.id);
    const body = JSON.parse(event.body);

    const review = await actions.updateReviewById(id, body);

    return Response.success({
      review: {
        ...review,
        likedBy: review.likedBy
          ? Object.values(review?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      },
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update Review!",
      error?.message || error
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
    const id = decodeURIComponent(event.pathParameters.id);

    await actions.deleteReviewById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Review!",
      error?.message || error
    );
  }
};
