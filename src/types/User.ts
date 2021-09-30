import { Document } from "dynamoose/dist/Document";

export class UserType extends Document {
  id: string;
  email: string;
  name: string;
  friends: UserType[];
}
