import express, { Request, Response } from 'express';
import { Review } from '../models/review.model';
import { log } from '../utils';

const router = express.Router();

// Create a new review
router.post('/reviews', async (req: Request, res: Response) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get all reviews
router.get('/reviews', async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find();
    res.send(reviews);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get a specific review by ID
router.get('/reviews/:id', async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.send(review);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Update a specific review by ID
router.put('/reviews/:id', async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.send(review);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Delete a specific review by ID
router.delete('/reviews/:id', async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
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
