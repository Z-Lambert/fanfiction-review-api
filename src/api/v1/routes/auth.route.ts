import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { IUser } from '../interfaces';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models';
import { log } from '../utils';
import { generateAccessToken } from '../auth';

const router = express.Router();

// Log in a user
router.get('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: Error, user: IUser, info: { message: string }) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).send({ message: info.message });
      }
      const token = jwt.sign(
        { sub: user._id },
        process.env.JWT_SECRET || '$%*pGm8xw7m#kT@J$TzLs!s^+7e)Jap3u%7sGy2k8w',
        {
          expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        }
      );
      res.send({ token });
    }
  );
});

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'Email already registered' });
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_NO || '10'));
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    const token = generateAccessToken(newUser);
    res.send({ token });
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

export default router;
