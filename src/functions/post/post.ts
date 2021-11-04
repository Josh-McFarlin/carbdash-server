import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/post";

/**
 * Create a new Post
 * @http POST
 */
export const createPost: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);
    const post = await actions.createPost(body);

    return Response.success({
      post,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Post!"
    );
  }
};

/**
 * Find Post By ID
 * @http GET
 */
export const findPostById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;

    const post = await actions.findPostById(id);

    return Response.success({
      post,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Post!"
    );
  }
};

/**
 * Find Posts
 * @http GET
 */
export const findPosts: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { user, restaurant, ownerType, tags } =
      event.queryStringParameters || {};

    const posts = await actions.findPosts({
      user,
      restaurant,
      ownerType,
      tags: tags?.split(","),
    });

    return Response.success({
      posts,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Posts!"
    );
  }
};

/**
 * Update Post By ID
 * @http POST
 */
export const updatePostById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);

    const post = await actions.updatePostById(id, body);

    return Response.success({
      post,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update Post!"
    );
  }
};

/**
 * Delete Post By ID
 * @http DELETE
 */
export const deletePostById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;

    await actions.deletePostById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Post!"
    );
  }
};