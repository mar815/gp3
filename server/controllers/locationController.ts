import { Request, Response } from 'express';
import { Location } from '../models/Location'; // Assuming a model named Location exists

export const getLocationsForItem = async (req: Request, res: Response) => {
  try {
    const itemName = req.query.item as string;

    // Fetch recycling locations for the provided item from the database
    const locations = await Location.findAll({
      where: {
        itemName: itemName // Assuming the Location model has a field named 'itemName' to link to the item
      }
    });

    res.json(locations);
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred: ' + error });
  }
};
