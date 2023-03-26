import express, { Request, Response } from 'express';
import { Review } from '../models/review.model';
import { log } from '../utils';
import { getRecommendations } from '../utils/recommendationAlgorithm';

const router = express.Router();

router.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const recommendation = getRecommendations(req.body.params.id);
    res.send(recommendation);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

export default router;
