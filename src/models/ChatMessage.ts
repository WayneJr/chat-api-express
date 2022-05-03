import { Schema, model } from 'mongoose';
import { MESSAGE_TYPES } from '../core/constants';
import { ChatMessageModel, IChatMessage } from '../interfaces/chatmessage';

const readByRecipientSchema = new Schema({
  readByUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  readAt: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: false, _id: false });


const chatMessageSchema = new Schema<IChatMessage, ChatMessageModel>({
  chatRoomId: {
    type: Schema.Types.ObjectId,
    ref: 'Chatroom'
  },
  message: Schema.Types.Mixed,
  type: {
    type: String,
    default: () => MESSAGE_TYPES.TYPE_TEXT
  },
  postedByUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  readByRecipients: [readByRecipientSchema]
}, {
  timestamps: true,
  collection: 'chatmessages',
});

chatMessageSchema.statics.createPostInChatRoom = async function(this: ChatMessageModel, chatRoomId: string, message: any, postedByUser: string) {
  try {
    const post = await this.create({
      chatRoomId,
      message,
      postedByUser,
      readByRecipients: { readByUserId: postedByUser }
    });
    
    const aggregate: any = await this.aggregate([
      // get post where id matches this post id
      { $match: { _id: post._id } },

      // perform a join on another table called users and 
      // retrieve a user whose _id = postedByUser
      {
        $lookup: {
          from: 'users',
          localField: 'postedByUser',
          foreignField: '_id',
          as: 'postedByUser',
        }
      },
      { $unwind: '$postedByUser' },

      // perform another join to the chatroom table as well
      {
        $lookup: {
          from: 'chatrooms',
          localField: 'chatRoomId',
          foreignField: '_id',
          as: 'chatRoomInfo',
        }
      },
      { $unwind: '$chatRoomInfo' },
      { $unwind: '$chatRoomInfo.userIds' },

      // perform a join on another table called users, and 
      // retrieve a user whose _id = userIds
      {
        $lookup: {
          from: 'users',
          localField: 'chatRoomInfo.userIds',
          foreignField: '_id',
          as: 'chatRoomInfo.userProfile',
        }
      },
      { $unwind: '$chatRoomInfo.userProfile' },

      // group the data as one
      {
        $group: {
          _id: '$chatRoomInfo._id',
          postId: { $last: '$_id' },
          chatRoomId: { $last: '$chatRoomInfo._id' },
          message: { $last: '$message' },
          type: { $last: '$type' },
          postedByUser: { $last: '$postedByUser' },
          readByRecipients: { $last: '$readByRecipients' },
          chatRoomInfo: { $addToSet: '$chatRoomInfo.userProfile' },
          createdAt: { $last: '$createdAt' },
          updatedAt: { $last: '$updatedAt' },
        }
      }
    ]);
    return aggregate[0];
  } catch(err) {
    console.log(err);
    throw err;
  }
};

chatMessageSchema.statics.getConversationByRoomId = async function (chatRoomId, options?) {
  try {
    return this.aggregate([
      { $match: { chatRoomId } },
      { $sort: { createdAt: -1 } },
      // do a join on another table called users, and 
      // get me a user whose _id = postedByUser
      {
        $lookup: {
          from: 'users',
          localField: 'postedByUser',
          foreignField: '_id',
          as: 'postedByUser',
        }
      },
      { $unwind: "$postedByUser" },
      // apply pagination
      { $skip: options.page * options.limit },
      { $limit: options.limit },
      { $sort: { createdAt: 1 } },
    ]);
  } catch (error) {
    throw error;
  }
}

export default model<IChatMessage, ChatMessageModel>('ChatMessage', chatMessageSchema);