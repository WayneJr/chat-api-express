import { Schema, model} from 'mongoose';
import { ChatRoomModel, IChatRoom } from '../interfaces/chatroom';
import { asyncHandler } from '../middleware/async';

const chatRoomSchema = new Schema<IChatRoom, ChatRoomModel>({
  userIds: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  type: String,
  chatInitiator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  collection: 'chatrooms',
});

chatRoomSchema.statics.initiateChat = async function (this: ChatRoomModel, userIds: string[], type: string, chatInitiator: string) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._id,
        type: availableRoom.type
      };
    }
  
    const newRoom = await this.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._id,
      type: newRoom.type
    };
  } catch(err) {
    console.log(err);
    throw err;
  }
};

chatRoomSchema.statics.getChatRoomByRoomId = async function (this: ChatRoomModel, roomId: string) {
  try {
    const room = await this.findOne({ _id: roomId });
    return room;
  } catch (error) {
    throw error;
  }
};

export default model<IChatRoom, ChatRoomModel>('Chatroom', chatRoomSchema);