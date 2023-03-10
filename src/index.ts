import express from 'express';
// PORT number imported from global constants
import { PORT } from './config/constants';
// Pino Logger utility
import { log } from './api/v1/utils';
// Routes defined elsewhere
import { home } from './api/v1/routes';

// Initialise express instance
const app = express();

// Define port number for server to listen on
const port = process.env.PORT || PORT;

// Define the type of encoding required by request objects
app.use(express.json()); // JSON
app.use(express.urlencoded({ extended: true })); // URL-encoded

// Define the routes being listened to
app.use(home);

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
