import express, { Request, Response } from 'express';
import { log } from '../utils';
import { ReadingList } from '../models';

const router = express.Router();

// Create a new reading list
router.post('/', async (req: Request, res: Response) => {
  try {
    const readingList = new ReadingList(req.body);
    await readingList.save();
    res.status(201).send(readingList);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get all reading lists
router.get('/', async (req: Request, res: Response) => {
  try {
    const readingLists = await ReadingList.find();
    res.send(readingLists);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get a specific reading list by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const readingList = await ReadingList.findById(req.params.id);
    if (!readingList) {
      return res.status(404).send({ message: 'Reading list not found' });
    }
    res.send(readingList);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Update a specific reading list by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const readingList = await ReadingList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!readingList) {
      return res.status(404).send({ message: 'Reading list not found' });
    }
    res.send(readingList);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Delete a specific reading list by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const readingList = await ReadingList.findByIdAndDelete(req.params.id);
    if (!readingList) {
      return res.status(404).send({ message: 'Reading list not found' });
    }
    res.send(readingList);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

export default router;
