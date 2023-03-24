import express, { Request, Response } from 'express';
import { log } from '../utils';
import { Fanfiction } from '../models';

const router = express.Router();

// Create a new fanfiction
router.post('/fanfictions', async (req: Request, res: Response) => {
  try {
    const fanfiction = new Fanfiction(req.body);
    await fanfiction.save();
    res.status(201).send(fanfiction);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get all fanfictions
router.get('/fanfictions', async (req: Request, res: Response) => {
  try {
    const fanfictions = await Fanfiction.find();
    res.send(fanfictions);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Get a specific fanfiction by id
router.get('/fanfictions/:id', async (req: Request, res: Response) => {
  try {
    const fanfiction = Fanfiction.findById(req.params.id);
    if (!fanfiction) {
      res.status(404).send({ message: 'Fanfiction not found' });
    }
    res.send(fanfiction);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Update a specific fanfiction by id
router.put('/fanfictions/:id', async (req: Request, res: Response) => {
  try {
    const fanfiction = await Fanfiction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!fanfiction)
      if (!fanfiction) {
        res.status(404).send({ message: 'Fanfiction not found' });
      }
    res.send(fanfiction);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

// Delete a specific fanfiction by id
router.delete('/fanfictions/:id', async (req: Request, res: Response) => {
  try {
    const fanfiction = await Fanfiction.findByIdAndDelete(req.params.id);
    if (!fanfiction)
      if (!fanfiction) {
        res.status(404).send({ message: 'Fanfiction not found' });
      }
    res.send(fanfiction);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
});

export default router;
