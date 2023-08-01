import { Request, Response } from 'express';
import { getGeocode, getNearbyRecyclingCenters } from '../utils/apiService';
import { Sequelize } from 'sequelize';
import { Item } from '../models/Item';

const getRecyclingLocations = async (req: Request, res: Response) => {
  let { city, state, item } = req.query as {
    city: string;
    state: string;
    item: string;
  };

  city = city
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  state = state
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  if (!city || !state || !item) {
    return res
      .status(400)
      .json({ msg: 'Please provide an item, city, and state.' });
  }

  const itemExists = await Item.findOne({
    where: Sequelize.where(
      Sequelize.fn('lower', Sequelize.col('name')),
      Sequelize.fn('lower', item)
    )
  });

  if (!itemExists) {
    return res
      .status(400)
      .json({ msg: 'This item is not found in our database.' });
  }

  const itemLowercase = item.toLowerCase();

  try {
    const locationQuery = `${city}, ${state}`;
    const geocodeData = await getGeocode(locationQuery);
    if (
      !geocodeData.results.length ||
      !geocodeData.results[0].geometry.location
    ) {
      return res.status(400).json({
        msg: 'Unable to find location with the provided city and state.'
      });
    }

    const location = geocodeData.results[0].geometry.location;
    const placesData = await getNearbyRecyclingCenters(location, itemLowercase);

    const formattedPlacesData = placesData.results.map((place: any) => ({
      name: place.name,
      address: place.vicinity,
      rating: place.rating
    }));

    res.json({ places: formattedPlacesData, location });
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred: ' + error });
  }
};

export { getRecyclingLocations };
