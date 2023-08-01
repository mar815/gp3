import express from 'express';
import { getRecyclingLocations } from '../controllers/locationsController';

const router = express.Router();

router.get('/api/locationSearch', getRecyclingLocations);
router.get('/recyclingLocations', getRecyclingLocations);
