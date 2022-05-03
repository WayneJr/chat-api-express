import { NextFunction, Request, Response } from "express";
import { asyncHandler } from '../middleware/async';
// @ts-ignore
import makeValidation from '@withvoid/make-validation';
import { CHAT_ROOM_TYPES } from '../core/constants/index';
import ChatRoom from "../models/ChatRoom";
import { successResponse } from '../utils/successResponse';
import ChatMessage from "../models/ChatMessage";
import { SocketServer } from '../core/socket/SocketServer';
import User from "../models/User";


export const initiate =  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const validation = makeValidation((types: any) => ({
    payload: req.body,
    checks: {
      userIds: {
        type: types.array,
        options: { unique: true, empty: false, stringOnly: true }
      },
      type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES} }
    }
  }));

  if (!validation.success) return res.status(400).json({ ...validation });

  const { userIds, type } = req.body;
  // Use the currently logged in user as the chat initiator
  console.log(req.userId, req.user, req.user.id);
  const { id: chatInitiator } = req.user; 
  // Compile the list of userIds to initiate the chat with
  const allUserIds = [ ...userIds, chatInitiator];

  const chatRoom = await ChatRoom.initiateChat(allUserIds, type, chatInitiator);

  successResponse(res, 200, "Successfully created chatroom", chatRoom);
});

export const postMessage =  asyncHandler(async (req: Request, res: Response) => { 
  const { roomId } = req.params;
  const { messageText } = req.body;
  const validation = makeValidation((types: any) => ({
    payload: req.body,
    checks: {
      messageText: { type: types.string },
    }
  }));
  if (!validation.success) return res.status(400).json({ ...validation });

  const messagePayload = {
    messageText, 
  };

  const post = await ChatMessage.createPostInChatRoom(roomId, messagePayload, req.user.id);
  console.log(roomId, req.user.id, messagePayload);
  SocketServer().in(roomId).emit('new message', { message: post });
  console.log(post);
  successResponse(res, 200, "Successfully sent message", post);
});
export const getRecentConversation = asyncHandler(async (req: Request, res: Response) => { 
  const { roomId } = req.params;
    const room = await ChatRoom.getChatRoomByRoomId(roomId)
    if (!room) {
      return res.status(400).json({
        success: false,
        message: 'No room exists for this id',
      })
    }
    const users = await User.getUserByIds(room.userIds);
    const options = {
      // @ts-ignore
      page: parseInt(req.query.page) || 0,
      // @ts-ignore
      limit: parseInt(req.query.limit) || 10,
    };
    const conversation = await ChatMessage.getConversationByRoomId(roomId, options);
    return res.status(200).json({
      success: true,
      conversation,
      users,
    });
});
export const getConversationByRoomId =  async (req: Request, res: Response) => { };
export const markConversationReadByRoomId =  async (req: Request, res: Response) => { };
