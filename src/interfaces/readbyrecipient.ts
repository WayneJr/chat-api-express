import { Document } from 'mongoose';
export interface IReadByRecipient extends Document {
  readByUserId: string;
  readAt: Date
}
