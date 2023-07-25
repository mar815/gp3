import express from 'express';
import { getAllItems } from '../controllers/itemsController';

const router = express.Router();

router.get('/', getAllItems);

export default router;
