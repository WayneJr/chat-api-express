import { Model, Document } from 'mongoose';
export interface IChatRoom extends Document {
  userIds: string[];
  type: string;
  chatInitiator: string;
}

export interface ChatRoomModel extends Model<IChatRoom> {
  initiateChat(userIds: string[], type: string, chatInitiator: string): any;
  getChatRoomByRoomId(roomId: string): any;
}