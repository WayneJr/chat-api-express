import express from 'express';
import cors from 'cors';
import authRouter from './auth';
import chatroomRouter from './chatroom';
import userRouter from './user';
import deleteRouter from './delete';


const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cors());
// router.options('*', cors());

router.use('/auth', authRouter);
router.use('/room', chatroomRouter);
router.use('/users', userRouter);
router.use('/delete', deleteRouter);


/** catch 404 and forward to error handler */
router.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

export default router;