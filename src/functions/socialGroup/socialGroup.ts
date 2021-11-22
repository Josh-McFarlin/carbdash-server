import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/socialGroup";
import "../../database";

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

    const socialGroup = await actions.createSocialGroup({
      ...body,
      owner: event.requestContext.authorizer.principalId,
    });

    return Response.success({
      socialGroup,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create SocialGroup!",
      error?.message || error
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
    const id = decodeURIComponent(event.pathParameters.id);

    const socialGroup = await actions.findSocialGroupById(id);

    if (socialGroup == null) {
      throw new Error("SocialGroup does not exist!");
    }

    return Response.success({
      socialGroup,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find SocialGroup!",
      error?.message || error
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
    const { name, owner, member, tags, page, perPage } =
      event.queryStringParameters || {};

    const socialGroups = await actions.findSocialGroups({
      name,
      owner,
      member,
      tags: tags?.split(","),
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
    });

    return Response.success({
      socialGroups,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find SocialGroups!",
      error?.message || error
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
    const id = decodeURIComponent(event.pathParameters.id);
    const body = JSON.parse(event.body);

    const socialGroup = await actions.updateSocialGroupById(id, body);

    return Response.success({
      socialGroup,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to update SocialGroup!",
      error?.message || error
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
    const id = decodeURIComponent(event.pathParameters.id);

    await actions.deleteSocialGroupById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete SocialGroup!",
      error?.message || error
    );
  }
};
