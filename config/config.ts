const {
  PORT,
  DATABASE_URL,
  JWT_ACCESS_SECRET,
  NODE_ENV,
  DATABASE_NAME
} = process.env;

export const port: string | number = PORT || 3000;
export const databaseUrl: string = DATABASE_URL || 'localhost:27017';
export const jwtSecret: string = JWT_ACCESS_SECRET || '';
export const nodeEnv: string =  NODE_ENV || 'development';
export const databaseName: string = DATABASE_NAME || '';