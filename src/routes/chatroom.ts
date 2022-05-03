import express from 'express';
import { getConversationByRoomId, getRecentConversation, initiate, markConversationReadByRoomId, postMessage } from '../controllers/chatroom';
import { decode } from '../middleware/auth';

const router = express.Router();

router
  .get('/', getRecentConversation)
  .get('/:roomId', getConversationByRoomId)
  .post('/initiate', decode, initiate)
  .post('/:roomId/message', decode, postMessage)
  .put('/:roomId/mark-read', markConversationReadByRoomId);

export default router;
