import express, { Request, Response } from 'express';
import { sequelize } from './database/db';
import itemsRoutes from './routes/itemsRoutes';

const app = express();
app.use(express.json());

app.use('/items', itemsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Recycling App.' });
});

app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Backend is connected.' });
});

app.listen(3000, () => {
  sequelize
    .sync()
    .then(() => {
      console.log('Database connected and synced.');
    })
    .catch((err) => console.log('Error: ' + err));

  console.log('Server is running on port 3000.');
});
