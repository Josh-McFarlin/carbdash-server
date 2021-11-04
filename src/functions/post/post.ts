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
 * Find Posts
 * @http GET
 */
export const findPosts: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    // const query = event.pathParameters;

    const posts = await actions.findPosts();

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
 * Find Post By ID
 * @http GET
 */
export const findPostById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const post = await actions.findPostById(query.id);

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
 * Find Posts By User
 * @http GET
 */
export const findPostsByUser: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const posts = await actions.findPostsByUser(query.id);

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
 * Find Posts By Restaurant
 * @http GET
 */
export const findPostsByRestaurant: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const posts = await actions.findPostsByRestaurant(query.id);

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
 * Find Posts By Tags
 * @http GET
 */
export const findPostsByTags: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const posts = await actions.findPostsByTags(query.tags.split(","));

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
    const query = event.pathParameters;
    const body = JSON.parse(event.body);

    const post = await actions.updatePostById(query.id, body);

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
    const query = event.pathParameters;

    await actions.deletePostById(query.id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Post!"
    );
  }
};
