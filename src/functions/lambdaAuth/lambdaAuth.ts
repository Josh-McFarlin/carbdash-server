import {
  APIGatewayAuthorizerHandler,
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";
import jwt from "jsonwebtoken";
import "../../database";
import { findUserByAuth, findRestaurantByAuth } from "../../actions/auth";

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_PUBLIC_KEY = process.env.AUTH0_CLIENT_PUBLIC_KEY;

export const userAuthorizer: APIGatewayAuthorizerHandler = async (
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

      const user = await findUserByAuth(decoded.sub);
      if (user == null) {
        throw new Error("User not found!");
      }

      console.log("reqARN", event.methodArn);

      return {
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "execute-api:Invoke",
              Resource: [
                event.methodArn,
                "arn:aws:execute-api:us-east-1:005569292759:7d7zpuz4mf/dev/OPTIONS/*",
                "arn:aws:execute-api:us-east-1:005569292759:7d7zpuz4mf/dev/GET/*",
                "arn:aws:execute-api:us-east-1:005569292759:7d7zpuz4mf/dev/POST/*",
                "arn:aws:execute-api:us-east-1:005569292759:7d7zpuz4mf/dev/PUT/*",
                "arn:aws:execute-api:us-east-1:005569292759:7d7zpuz4mf/dev/DELETE/*",
              ],
              Effect: "Allow",
            },
          ],
        },
        principalId: user._id.toString(),
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

      const restaurant = await findRestaurantByAuth(decoded.sub);
      if (restaurant == null) {
        throw new Error("Restaurant not found!");
      }

      return {
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "execute-api:Invoke",
              Resource: [
                event.methodArn,
                "arn:aws:execute-api:us-east-1:005569292759:7d7zpuz4mf/dev/OPTIONS/*",
                "arn:aws:execute-api:us-east-1:005569292759:7d7zpuz4mf/dev/GET/*",
                "arn:aws:execute-api:us-east-1:005569292759:7d7zpuz4mf/dev/POST/*",
                "arn:aws:execute-api:us-east-1:005569292759:7d7zpuz4mf/dev/PUT/*",
                "arn:aws:execute-api:us-east-1:005569292759:7d7zpuz4mf/dev/DELETE/*",
              ],
              Effect: "Allow",
            },
          ],
        },
        principalId: restaurant._id.toString(),
      };
    } else {
      throw new Error("Unauthorized.");
    }
  } catch (error) {
    console.log(`Token invalid. ${error.message || error}`);
    throw new Error("Unauthorized.");
  }
};
