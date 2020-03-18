import express, { NextFunction } from 'express';
import todoRoutes from './routes/todos';
import { json } from 'body-parser';

const app = express();

app.use(json());

app.use('/todos', todoRoutes);

//error handling middleware function. will be fired by express if at any time we have an error in another middleware
app.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
  res.status(500).json({message: err.message});
});

app.listen(3000);