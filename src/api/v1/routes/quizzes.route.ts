import express, { Request, Response } from 'express';
import { log } from '../utils';
import { Quiz } from '../models';

const router = express.Router();

// Create a new quiz
router.post('/', async (req: Request, res: Response) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.sendStatus(201).send(quiz);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get all quizzes
router.get('/', async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find();
    res.send(quizzes);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get a specific quiz by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send({ message: 'Quiz not found' });
    }
    res.send(quiz);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Update a specific quiz by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!quiz) {
      return res.status(404).send({ message: 'Quiz not found' });
    }
    res.send(quiz);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Delete a specific quiz by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).send({ message: 'Quiz not found' });
    }
    res.send(quiz);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

export default router;
