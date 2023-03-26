import { IUser } from '../interfaces';
import { User } from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findOneUser } from '../database';

export const authenticateUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  const user = await findOneUser(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  return user;
};

export const registerUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  const user = await findOneUser(email);
  if (user) {
    throw new Error('Email already registered');
  }
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_NO || '10'));
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  return newUser;
};

export const generateToken = (user: IUser): string => {
  const token = jwt.sign(
    { sub: user._id },
    process.env.JWT_SECRET || '$%*pGm8xw7m#kT@J$TzLs!s^+7e)Jap3u%7sGy2k8w',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
  return token;
};
