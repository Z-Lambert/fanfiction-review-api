import express, { Request, Response } from 'express';
import { log } from '../utils';
import { CuratedList } from '../models';

const router = express.Router();

// Create a new curated list
router.post('/', async (req: Request, res: Response) => {
  try {
    const readingList = new CuratedList(req.body);
    await readingList.save();
    res.status(201).send(readingList);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get all curated lists
router.get('/', async (req: Request, res: Response) => {
  try {
    const curatedLists = await CuratedList.find();
    res.send(curatedLists);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get a specific curated list by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const curatedList = await CuratedList.findById(req.params.id);
    if (!curatedList) {
      return res.status(404).send({ message: 'Reading list not found' });
    }
    res.send(curatedList);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Update a specific reading list by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const curatedList = await CuratedList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!curatedList) {
      return res.status(404).send({ message: 'Reading list not found' });
    }
    res.send(curatedList);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Delete a specific reading list by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const curatedList = await CuratedList.findByIdAndDelete(req.params.id);
    if (!curatedList) {
      return res.status(404).send({ message: 'Reading list not found' });
    }
    res.send(curatedList);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

export default router;
