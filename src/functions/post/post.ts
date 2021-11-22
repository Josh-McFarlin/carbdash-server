import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/post";
import "../../database";

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

    const post = await actions.createPost({
      ...body,
      ...(body.ownerType === "User"
        ? {
            user: event.requestContext.authorizer.principalId,
          }
        : {
            restaurant: event.requestContext.authorizer.principalId,
          }),
    });

    return Response.success({
      post: {
        ...post,
        likedBy: post.likedBy
          ? Object.values(post?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      },
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Post!",
      error?.message || error
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
    const id = decodeURIComponent(event.pathParameters.id);

    const post = await actions.findPostById(id);

    if (post == null) {
      throw new Error("Post does not exist!");
    }

    return Response.success({
      post: {
        ...post,
        likedBy: post.likedBy
          ? Object.values(post?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      },
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Post!",
      error?.message || error
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
    const { user, restaurant, ownerType, category, tags, page, perPage } =
      event.queryStringParameters || {};

    const posts = await actions.findPosts({
      user,
      restaurant,
      ownerType,
      category,
      tags: tags?.split(","),
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
    } as any);

    return Response.success({
      posts: posts.map((post) => ({
        ...post,
        likedBy: post.likedBy
          ? Object.values(post?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      })),
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Posts!",
      error?.message || error
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
    const id = decodeURIComponent(event.pathParameters.id);
    const body = JSON.parse(event.body);

    const post = await actions.updatePostById(id, body);

    return Response.success({
      post: {
        ...post,
        likedBy: post.likedBy
          ? Object.values(post?.likedBy).map((i) => i.ref.toString()) || []
          : [],
      },
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update Post!",
      error?.message || error
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
    const id = decodeURIComponent(event.pathParameters.id);

    await actions.deletePostById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Post!",
      error?.message || error
    );
  }
};
