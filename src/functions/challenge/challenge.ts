import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/challenge";

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
    const challenge = await actions.createChallenge(body);

    return Response.success({
      challenge,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Challenge!"
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
    const { id } = event.pathParameters;

    const challenge = await actions.findChallengeById(id);

    return Response.success({
      challenge,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Challenge!"
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
    const { name, user, owner } = event.queryStringParameters || {};

    const challenges = await actions.findChallenges({
      name,
      user,
      owner,
    });

    return Response.success({
      challenges,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Challenges!"
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
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);

    const challenge = await actions.updateChallengeById(id, body);

    return Response.success({
      challenge,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update Challenge!"
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
    const { id } = event.pathParameters;

    await actions.deleteChallengeById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Challenge!"
    );
  }
};
