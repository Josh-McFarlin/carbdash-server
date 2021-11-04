import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/socialGroup";

/**
 * Create a new SocialGroup
 * @http POST
 */
export const createSocialGroup: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);
    const socialGroup = await actions.createSocialGroup(body);

    return Response.success({
      socialGroup,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create SocialGroup!"
    );
  }
};

/**
 * Find SocialGroups
 * @http GET
 */
export const findSocialGroups: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    // const query = event.pathParameters;

    const socialGroups = await actions.findSocialGroups();

    return Response.success({
      socialGroups,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find SocialGroups!"
    );
  }
};

/**
 * Find SocialGroup By ID
 * @http GET
 */
export const findSocialGroupById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;

    const socialGroup = await actions.findSocialGroupById(id);

    return Response.success({
      socialGroup,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find SocialGroup!"
    );
  }
};

/**
 * Find SocialGroups By Name
 * @http GET
 */
export const findSocialGroupsByName: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const socialGroups = await actions.findSocialGroupsByName(query.name);

    return Response.success({
      socialGroups,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find SocialGroups!"
    );
  }
};

/**
 * Find SocialGroups By Owner
 * @http GET
 */
export const findSocialGroupsByOwner: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const socialGroups = await actions.findSocialGroupsByOwner(query.id);

    return Response.success({
      socialGroups,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find SocialGroups!"
    );
  }
};

/**
 * Find SocialGroups By Member
 * @http GET
 */
export const findSocialGroupsByMember: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const socialGroups = await actions.findSocialGroupsByMember(query.id);

    return Response.success({
      socialGroups,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find SocialGroups!"
    );
  }
};

/**
 * Find SocialGroups By Tags
 * @http GET
 */
export const findSocialGroupsByTags: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.pathParameters;

    const socialGroups = await actions.findSocialGroupsByTags(
      query.tags.split(",")
    );

    return Response.success({
      socialGroups,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find SocialGroups!"
    );
  }
};

/**
 * Update SocialGroup By ID
 * @http POST
 */
export const updateSocialGroupById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);

    const socialGroup = await actions.updateSocialGroupById(id, body);

    return Response.success({
      socialGroup,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update SocialGroup!"
    );
  }
};

/**
 * Delete SocialGroup By ID
 * @http DELETE
 */
export const deleteSocialGroupById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;

    await actions.deleteSocialGroupById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete SocialGroup!"
    );
  }
};
