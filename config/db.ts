import mongoose from 'mongoose';
import { databaseName, databaseUrl } from './config';

const CONNECTION_URL = `mongodb://${databaseUrl}/${databaseName}`;

mongoose.connect(CONNECTION_URL);

mongoose.connection.on('connected', () => console.log('Mongo has connected succesfully'));

mongoose.connection.on('reconnected', () => console.log('Mongo has reconnected'));

mongoose.connection.on('error', error => { 
  console.log('Mongo has an error', error);
  mongoose.disconnect();
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})