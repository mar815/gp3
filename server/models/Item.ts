import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../database/db';

export class Item extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public protocol!: string;
  public image!: string;
}

Item.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    protocol: DataTypes.STRING,
    image: DataTypes.STRING
  },
  {
    tableName: 'items',
    sequelize
  }
);
