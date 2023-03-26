import express, { Request, Response } from 'express';
import { Review } from '../models/review.model';
import { log } from '../utils';

const router = express.Router();

// Create a new review for a story by ID
router.post('/:storyId', async (req: Request, res: Response) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get reviews for a story by ID
router.get('/:storyId', async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.storyId);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.send(review);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Update a specific review by review ID
router.put('/:reviewId', async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      {
        new: true,
      }
    );
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.send(review);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Delete a specific review by review ID
router.delete('/:reviewId', async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.send(review);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

export default router;
