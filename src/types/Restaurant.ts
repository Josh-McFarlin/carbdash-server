import { Document } from "dynamoose/dist/Document";
import { Location } from "./Location";

export class RestaurantType extends Document {
  id: string;
  email: string;
  name: string;
  location: Location;
  website?: string;
}
