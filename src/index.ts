import express, { Application, Response } from 'express';
import { PORT } from './config/constants';
import { log } from './api/v1/utils';

const app: Application = express();
const port = process.env.PORT || PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res: Response) => {
  res.sendStatus(200);
});

try {
  app.listen(port, (): void => log.info(`API Running on port ${port}.`));
} catch (error) {
  if (error instanceof Error) {
    log.error(`Error starting server: ${error.message}`);
  } else {
    log.error(`Error starting server: ${error}`);
  }
}
