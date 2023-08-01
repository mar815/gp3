import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../database/db';

export class Item extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public protocol!: string;
  public image!: string;
}

interface Item {
  id: string;
  name: string;
  description: string;
  protocol: string;
  image: string;
}



