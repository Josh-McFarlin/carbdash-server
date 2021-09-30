import * as dynamoose from "dynamoose";
import { RestaurantType } from "../../types/Restaurant";

const restaurantSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      schema: {
        address: {
          type: Object,
          schema: {
            street: {
              type: String,
              required: true,
            },
            city: {
              type: String,
              required: true,
            },
            state: {
              type: String,
              required: true,
            },
            zipCode: Number,
            country: {
              type: String,
              required: true,
            },
          },
        },
        coordinates: {
          type: Object,
          schema: {
            latitude: {
              type: Number,
              required: true,
            },
            longitude: {
              type: Number,
              required: true,
            },
          },
        },
      },
    },
    website: String,
  },
  {
    timestamps: true,
  }
);

const Restaurant = dynamoose.model<RestaurantType>(
  "restaurantTable",
  restaurantSchema,
  {
    create: true,
    throughput: "ON_DEMAND",
  }
);

export default Restaurant;
