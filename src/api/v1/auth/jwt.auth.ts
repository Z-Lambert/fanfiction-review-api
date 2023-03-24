import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';

const generateAccessToken = (user: IUser) => {
  const payload = {
    sub: user._id,
    email: user.email,
  };
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  };
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || '$%*pGm8xw7m#kT@J$TzLs!s^+7e)Jap3u%7sGy2k8w',
    options
  );
};

const verifyAccessToken = (token: string) => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || '$%*pGm8xw7m#kT@J$TzLs!s^+7e)Jap3u%7sGy2k8w'
    );
    return payload;
  } catch (err) {
    return null;
  }
};

const decodeAccessToken = (token: string) => {
  const payload = jwt.decode(token);
  return payload;
};

export { generateAccessToken, verifyAccessToken, decodeAccessToken };
