import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/db';

export class SearchQuery extends Model {
  public id!: number;
  public city!: string;
  public state!: string;
  public item!: string;
  public createdAt!: Date;
}

SearchQuery.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'search_queries',
    sequelize
  }
);
