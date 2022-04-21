import { USER_TYPES, userTypeInterface } from '../core/constants/index';
export default interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  type: userTypeInterface;
}