import { Document, Model } from 'mongoose';
import { IReadByRecipient } from './readbyrecipient';

export interface IChatMessage extends Document {
  chatRoomId: string;
  message: any;
  type: string;
  postedByUser: string;
  readByRecipients: IReadByRecipient[];
}

export interface ChatMessageModel extends Model<IChatMessage> {
  createPostInChatRoom(chatRoomId: string, message: any, postedByUser: string): any;
  getConversationByRoomId(chatRoomId: string, options?: any): any;
}
