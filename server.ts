import http from 'http';
import express from 'express';
import logger from 'morgan';
import './config/db';

import router from './src/routes';
import { port } from './config/config';

const app = express();

app.set('port', port || 3000);


app.use(logger('dev'));

app.use('/api', router);

/** Create HTTP Server */
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
})