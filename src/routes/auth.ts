import express from 'express';
import { encode } from '../middleware/jwt';

const router = express.Router();

router
  .post('/login/:userId', encode, (req, res, next) => { });

export default router;