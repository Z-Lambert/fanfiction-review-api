import { IUser } from '../interfaces';
import { User } from '../models';

export const createUser = async (reqBody: IUser) => {
  const user = new User(reqBody);
  return await user.save();
};

export const getUser = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId);
};
