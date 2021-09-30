import User from "../models/User";
import { UserType } from "../../types/User";
import { QueryResponse } from "dynamoose/dist/DocumentRetriever";

export const createUser = async (
  user: Pick<UserType, "email" | "name">
): Promise<UserType> => {
  const newUser = new User(user);

  await newUser.save();

  return newUser;
};

export const findUserById = (
  id: UserType["id"]
): Promise<QueryResponse<UserType>> => User.query(id).limit(1).exec();

export const findUserByEmail = (
  email: UserType["email"]
): Promise<QueryResponse<UserType>> => User.query({ email }).limit(1).exec();

export const updateUserById = async (
  id: UserType["id"],
  updates: Pick<UserType, "name">
): Promise<UserType> => User.update({ id }, updates);

export const deleteUserById = async (id: UserType["id"]): Promise<void> =>
  User.delete({ id });
