export const environment = {
  DB_ALLOW_CONNECTION_ON_TIMEOUT:
    process.env.DB_ALLOW_CONNECTION_ON_TIMEOUT === 'true',
  DB_CONNECTION_TIMEOUT: process.env.DB_CONNECTION_TIMEOUT
    ? parseInt(process.env.DB_CONNECTION_TIMEOUT)
    : 2000,
  DB_DATABASE: process.env.DB_DATABASE || '',
  DB_IDLE_TIMEOUT: process.env.DB_IDLE_TIMEOUT 
    ? parseInt(process.env.DB_IDLE_TIMEOUT)
    : 30000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_MAX_CONNECTIONS: process.env.DB_MAX_CONNECTIONS
    ? parseInt(process.env.DB_MAX_CONNECTIONS)
    : 20,
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_PORT: process.env.DB_PORT 
    ? parseInt(process.env.DB_PORT)
    : 5432,
  DB_SCHEMA: process.env.DB_SCHEMA || "public",
  DB_USER: process.env.DB_USER || "postgres",
};
