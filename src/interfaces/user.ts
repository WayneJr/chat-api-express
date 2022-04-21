import { USER_TYPES, userTypeInterface } from '../core/constants/index';
export default interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  type: userTypeInterface;
}