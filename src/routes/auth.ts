import express, { Request, Response, NextFunction } from 'express';
import { encode } from '../middleware/auth';

const router = express.Router();

router
  .post('/login/:userId', encode, (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(200)
      .json({
        success: true,
        // @ts-ignore
        authorization: req.authToken,
      });
});

export default router;