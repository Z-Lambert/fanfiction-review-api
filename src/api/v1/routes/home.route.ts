import { Router, Request, Response } from 'express';
export const app: Router = Router();

app.get('/', (_, res: Response) => {
  res.send('Home');
});

app.post('/', (req: Request, res: Response) => {
  res.send(`Home: ${req.body.data}`);
});
