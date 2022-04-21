import { Request, Response } from 'express';
import { asyncHandler } from "../middleware/async";
// @ts-ignore
import makeValidation from '@withvoid/make-validation';
import User from '../models/User';
import { USER_TYPES } from '../core/constants';

export const onGetAllUsers = asyncHandler(async (req: Request, res: Response) => { 
  const users = await User.find();
  successResponse(res, users);
});
export const onGetUserById =  asyncHandler(async (req: Request, res: Response) => { 
  const user = await User.findById(req.params.id);
  successResponse(res, user);
});
export const onCreateUser = asyncHandler(async (req: Request, res: Response) => {
  const validation = makeValidation((types: any) => ({
    payload: req.body,
    checks: {
      firstName: { type: types.string },
      lastName: { type: types.string },
      type: { type: types.enum, options: { enum: USER_TYPES } },
    }
  }))

  if (!validation.success) return res.status(400).json(validation);

  const { firstName, lastName, type } = req.body;

  const user = await User.create({ firstName, lastName, type });

  successResponse(res, user);
});
export const onDeleteUserById = asyncHandler(async (req: Request, res: Response) => {
  await User.findByIdAndDelete();
  successResponse(res, null);
});

function successResponse(res: Response, data: any) {
  return res.status(200).json({ success: true, data: data });
}