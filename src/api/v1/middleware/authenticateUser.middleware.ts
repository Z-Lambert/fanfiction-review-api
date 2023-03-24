import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../auth';
import { User } from '../models';
import { IUser } from '../interfaces';

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);
    if (payload) {
      User.findById(payload.sub)
        .then((user: IUser | null) => {
          if (user) {
            req.user = user;
            next();
          } else {
            res.status(401).json({ error: 'Unauthorized' });
          }
        })
        .catch((err: Error) => next(err));
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default authenticateJWT;
