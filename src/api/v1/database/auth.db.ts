import { IUser } from '../interfaces';
import { User } from '../models';

export const findOneUser = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};
