import { Document } from "dynamoose/dist/Document";

export class ReviewType extends Document {
  id: string;
  userId: string;
  restaurantId: string;
  tags: string[];
  body: string;
}
