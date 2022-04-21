import { ErrorResponse } from "../utils/errorResponse";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  console.log(err.message, 'ErrorFile');

  if (err.name === 'MongoError' && err.code === 11000) {
    const message = Object.values(err.errors).map((val: any) => val.message);
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};