import { USER_TYPES, userType } from '../core/constants/index';
import { Document, Model } from 'mongoose';
export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  type: userType;
}

export interface UserModel extends Model<IUser> {
  getUserByIds(ids: string[]): any;
}
