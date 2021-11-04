import {
  APIGatewayAuthorizerHandler,
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";
import jwt from "jsonwebtoken";
import "../../database";

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_PUBLIC_KEY = process.env.AUTH0_CLIENT_PUBLIC_KEY;

export const userAuthorizer: APIGatewayAuthorizerHandler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  // console.log("authorizer");
  // console.log("event", JSON.stringify(event));

  try {
    const authHeader = event.authorizationToken?.split(" ") || [];

    if (authHeader.length === 2 && authHeader[0].toLowerCase() === "bearer") {
      const decoded = jwt.verify(authHeader[1], AUTH0_CLIENT_PUBLIC_KEY, {
        audience: AUTH0_CLIENT_ID,
      }) as {
        sub: string;
      };

      return {
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "execute-api:Invoke",
              Resource: [event.methodArn],
              Effect: "Allow",
            },
          ],
        },
        principalId: decoded.sub,
      };
    } else {
      throw new Error("Unauthorized.");
    }
  } catch (error) {
    console.log(`Token invalid. ${error.message || error}`);
    throw new Error("Unauthorized.");
  }
};

export const restaurantAuthorizer: APIGatewayAuthorizerHandler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  try {
    const authHeader = event.authorizationToken?.split(" ") || [];

    if (authHeader.length === 2 && authHeader[0].toLowerCase() === "bearer") {
      const decoded = jwt.verify(authHeader[1], AUTH0_CLIENT_PUBLIC_KEY, {
        audience: AUTH0_CLIENT_ID,
      }) as {
        sub: string;
      };

      return {
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "execute-api:Invoke",
              Resource: [event.methodArn],
              Effect: "Allow",
            },
          ],
        },
        principalId: decoded.sub,
      };
    } else {
      throw new Error("Unauthorized.");
    }
  } catch (error) {
    console.log(`Token invalid. ${error.message || error}`);
    throw new Error("Unauthorized.");
  }
};
