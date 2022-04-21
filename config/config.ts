const {
  PORT,
  DATABASE_URL,
  JWT_ACCESS_SECRET,
  NODE_ENV,
  DATABASE_NAME
} = process.env;

export const port: string | undefined = PORT;
export const databaseUrl: string = DATABASE_URL || 'localhost:27017';
export const jwtSecret: string | undefined = JWT_ACCESS_SECRET;
export const nodeEnv: string | undefined =  NODE_ENV || 'development';
export const databaseName: string | undefined = DATABASE_NAME;