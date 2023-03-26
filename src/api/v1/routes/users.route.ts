import express, { Request, Response } from 'express';
import { log } from '../utils';
import { User } from '../models';
import { createUser, getUser } from '../database';

const router = express.Router();

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get a specific user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = getUser(req.params.id) 
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Update a specific user by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Delete a specific user by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

export default router;
