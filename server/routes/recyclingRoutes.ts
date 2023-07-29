import express from 'express';
import { getRecyclingLocations } from '../controllers/recyclingLocationsController';

const router = express.Router();

router.get('/recyclingLocations', getRecyclingLocations);

export default router;
