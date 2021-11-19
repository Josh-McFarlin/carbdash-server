import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import Response from "../../utils/Response";
import { StatusCode } from "../../types/Response";
import * as actions from "../../actions/save";
import "../../database";

/**
 * Create a new Save
 * @http POST
 */
export const createSave: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);
    const save = await actions.createSave({
      fromType: "User",
      ...body,
      from: event.requestContext.authorizer.principalId,
    });

    return Response.success({
      save,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to create Save!"
    );
  }
};

/**
 * Find Saves
 * @http GET
 */
export const findSaves: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const { fromType, from, contentType, content, simpleType, page, perPage } =
      event.queryStringParameters || {};

    if (!from && !content) {
      throw new Error("A from or content must be supplied!");
    }

    const isSimple = simpleType != null;

    const saves = await actions.findSaves({
      fromType: fromType as any,
      from,
      contentType: contentType as any,
      content,
      page: page ? parseInt(page, 10) : null,
      perPage: perPage ? parseInt(perPage, 10) : null,
    });

    return Response.success({
      saves: isSimple
        ? simpleType === "from"
          ? saves.map((i) => i.from)
          : saves.map((i) => i.content)
        : saves,
    });
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to find Saves!"
    );
  }
};

/**
 * Delete Save By ID
 * @http DELETE
 */
export const deleteSaveById: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const id = decodeURIComponent(event.pathParameters.id);

    await actions.deleteSaveById(id);

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Save!"
    );
  }
};

/**
 * Delete Save By Content
 * @http DELETE
 */
export const deleteSaveByContent: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  try {
    const contentType = decodeURIComponent(
      event.queryStringParameters?.contentType
    );
    const content = decodeURIComponent(event.queryStringParameters?.content);

    await actions.deleteSaveByContent({
      from: event.requestContext.authorizer.principalId,
      fromType: "User",
      contentType: contentType as any,
      content,
    });

    return Response.success();
  } catch (error) {
    return Response.error(
      StatusCode.InternalServerError,
      "Unable to delete Save!"
    );
  }
};
