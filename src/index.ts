import express, { Request, Response } from 'express';
// PORT number imported from global constants
// Pino Logger utility
import { log } from './api/v1/utils';
// Routes defined elsewhere
import {
  authRouter,
  fanfictionRouter,
  quizRouter,
  readingListRouter,
  recommendationRouter,
  reviewRouter,
} from './api/v1/routes';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import authenticateJWT from './api/v1/middleware/authenticateUser.middleware';

// Initialise env consts
config();

// Initialise express instance
const app = express();

// Database
if (process.env.MONGODB_URI) {
  connect(process.env.MONGODB_URI)
    .then(() => {
      log.info('Connected to MongoDB');
    })
    .catch(error => {
      log.info('Error connecting to MongoDB:', error.message);
    });
} else {
  log.error('MongoDB URI missing from env file');
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

// Routes
app.use('/auth', authRouter);
app.use('/quiz', authenticateJWT, quizRouter);
app.use('/reading-list', authenticateJWT, readingListRouter);
app.use('/review', authenticateJWT, reviewRouter);
app.use('/fanfiction', authenticateJWT, fanfictionRouter);
app.use('recommendations', recommendationRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  log.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Define port number for server to listen on
const port = process.env.PORT || 4000;

// Define the routes being listened to
app.use(authRouter);

// Start server listening on express instance defined above
try {
  app.listen(port, (): void => log.info(`API Running on port ${port}.`));
} catch (error) {
  if (error instanceof Error) {
    log.error(`Error starting server: ${error.message}`);
  } else {
    log.error(`Error starting server: ${error}`);
  }
}
