import * as dynamoose from "dynamoose";
import { UserType } from "../../types/User";

const userSchema = new dynamoose.Schema(
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
    friends: {
      type: Array,
      schema: [dynamoose.THIS],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = dynamoose.model<UserType>("userTable", userSchema, {
  create: true,
  throughput: "ON_DEMAND",
});

export default User;
