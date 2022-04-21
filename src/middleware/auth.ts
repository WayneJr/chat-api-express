import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { asyncHandler } from './async';
import IUser from '../interfaces/user';
import { jwtSecret } from '../../config/config';


export const encode = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  // @ts-ignore
  const user: IUser = await User.findById(userId);
  const payload = {
    userId: user._id,
    userType: user.type
  }
  const authToken: string = jwt.sign(payload, jwtSecret);

  console.log('Auth Token:', authToken);
  // @ts-ignore
  req.authToken = authToken;
  next();
});

export const decode = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }

  // @ts-ignore
  const accessToken: string = req.headers.authorization?.split(' ')[1];

  const decoded = jwt.verify(accessToken, jwtSecret);
  // @ts-ignore
  req.user = decoded;
  return next();
});