import { Request, Response } from 'express';
import { Item } from '../models/Item';
import { Op } from 'sequelize';

export const getAllItems = async (req: Request, res: Response) => {
  try {
    // Extract search term from query parameters
    const searchTerm = req.query.term as string;

    let items;
    if (searchTerm) {
      // If there's a search term, filter items based on it
      items = await Item.findAll({
        where: {
          name: {
            // Using a LIKE query to match items that contain the search term
            [Op.like]: '%' + searchTerm + '%'
          }
        }
      });
    } else {
      // If no search term, return all items
      items = await Item.findAll();
    }

    res.json(items);
  } catch (error) {
    res.json({ msg: 'An error occurred: ' + error });
  }
};
