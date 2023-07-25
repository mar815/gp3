import { Request, Response } from 'express';
import { Item } from '../models/Item';

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.json({ msg: 'An error occurred: ' + error });
  }
};
