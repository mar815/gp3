import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Establish connection to the database
export const sequelize = new Sequelize(process.env.DATABASE_URL as string);

sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err));
