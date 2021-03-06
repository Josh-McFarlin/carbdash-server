import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/challenge";
import "../../database";

/**
 * Create a new Challenge
 * @http POST
 */
export const createChallenge: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);

    const challenge = await actions.createChallenge({
      ...body,
      owner: event.requestContext.authorizer.principalId,
    });

    return Response.success({
      challenge,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Challenge!",
      error?.message || error
    );
  }
};

/**
 * Find Challenge By ID
 * @http GET
 */
export const findChallengeById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const id = decodeURIComponent(event.pathParameters.id);

    const challenge = await actions.findChallengeById(id);

    if (challenge == null) {
      throw new Error("Challenge does not exist!");
    }

    return Response.success({
      challenge,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Challenge!",
      error?.message || error
    );
  }
};

/**
 * Find Challenges
 * @http GET
 */
export const findChallenges: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { name, user, owner, page, perPage } =
      event.queryStringParameters || {};

    const challenges = await actions.findChallenges({
      name,
      user,
      owner,
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
    });

    return Response.success({
      challenges,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Challenges!",
      error?.message || error
    );
  }
};

/**
 * Update Challenge By ID
 * @http POST
 */
export const updateChallengeById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const id = decodeURIComponent(event.pathParameters.id);
    const body = JSON.parse(event.body);

    const challenge = await actions.updateChallengeById(id, body);

    return Response.success({
      challenge,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update Challenge!",
      error?.message || error
    );
  }
};

/**
 * Delete Challenge By ID
 * @http DELETE
 */
export const deleteChallengeById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const id = decodeURIComponent(event.pathParameters.id);

    await actions.deleteChallengeById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Challenge!",
      error?.message || error
    );
  }
};
