import * as dynamoose from "dynamoose";
import { ReviewType } from "../../types/Review";

const reviewSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      schema: [String],
      default: [],
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = dynamoose.model<ReviewType>("reviewTable", reviewSchema, {
  create: true,
  throughput: "ON_DEMAND",
});

export default Review;
