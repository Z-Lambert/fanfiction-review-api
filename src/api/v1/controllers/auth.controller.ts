import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { generateAccessToken } from '../auth';
import { IUser } from '../interfaces';
import { log } from '../utils';
import { generateToken, registerUser } from '../services';

export const loginUserHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: Error, user: IUser, info: { message: string }) => {
      try {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(400).send({ message: info.message });
        }
        const token = generateToken(user);
        res.send({ token });
      } catch (err) {
        next(err);
      }
    }
  )(req, res, next);
};

export const registerUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const newUser = await registerUser(email, password);
    const token = generateAccessToken(newUser);
    res.send({ token });
  } catch (err) {
    log.error(err);
    next(err);
  }
};
