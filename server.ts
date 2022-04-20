import http from 'http';
import express from 'express';
import logger from 'morgan';

import router from './src/routes';

const app = express();

const port = 3000; // Set to env later
app.set('port', port);


app.use(logger('dev'));

app.use('/api', router);

/** Create HTTP Server */
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
})