import express from 'express';
import { getConversationByRoomId, getRecentConversation, initiate, markConversationReadByRoomId, postMessage } from '../controllers/chatroom';

const router = express.Router();

router
  .get('/', getRecentConversation)
  .get('/:roomId', getConversationByRoomId)
  .post('initiate', initiate)
  .post('/:roomId/message', postMessage)
  .put('/:roomId/mark-read', markConversationReadByRoomId);

export default router;
