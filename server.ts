import http from 'http';
import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';

import './config/db';

import router from './src/routes';
import WebSocket from './src/utils/WebSocket';
import { port } from './config/config';
import { SocketServer } from './src/core/socket/SocketServer';

const app = express();

app.set('port', port);


app.use(logger('dev'));

app.use('/api/v1', router);

/** Create HTTP Server */
export const server = http.createServer(app);

/** Create socket connection */
SocketServer();


server.listen(port);
server.on('listening', () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
})