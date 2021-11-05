import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/user";
import "../../database";

/**
 * Create a new User
 * @http POST
 */
export const createUser: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);

    const user = await actions.createUser(body);

    return Response.success({
      user,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create User!"
    );
  }
};

/**
 * Find User By ID
 * @http GET
 */
export const findUserById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;

    const user = await actions.findUserById(id);

    return Response.success({
      user,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find User!"
    );
  }
};

/**
 * Find Users
 * @http GET
 */
export const findUsers: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { email, username, page, perPage } =
      event.queryStringParameters || {};

    const users = await actions.findUsers({
      email,
      username,
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
    });

    return Response.success({
      users,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find User!"
    );
  }
};

/**
 * Update User By ID
 * @http POST
 */
export const updateUserById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);

    const user = await actions.updateUserById(id, body);

    return Response.success({
      user,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update User!"
    );
  }
};

/**
 * Delete User By ID
 * @http DELETE
 */
export const deleteUserById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;

    await actions.deleteUserById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete User!"
    );
  }
};
