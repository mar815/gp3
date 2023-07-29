import express, { Request, Response } from 'express';
import axios from 'axios';

// Initialize the router
const router = express.Router();

// Add a new route that calls the Google Maps API
router.get('/api/locationSearch', async (req: Request, res: Response) => {
  const input = req.query.input as string;

  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address: input,
          key: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
