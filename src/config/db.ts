import { Pool, PoolConfig } from "pg";
import { exit } from "process";
import { environment } from './environment';

const defaultConfig: PoolConfig = {
  allowExitOnIdle: environment.DB_ALLOW_CONNECTION_ON_TIMEOUT,
  connectionTimeoutMillis: environment.DB_CONNECTION_TIMEOUT,
  database: environment.DB_DATABASE,
  host: environment.DB_HOST,
  idleTimeoutMillis: environment.DB_IDLE_TIMEOUT,
  max: environment.DB_MAX_CONNECTIONS,
  password: environment.DB_PASSWORD,
  port: environment.DB_PORT,
  user: environment.DB_USER,
};

export class Database {
  private config: PoolConfig;
  private pool: Pool;

  constructor(config?: PoolConfig) {
    this.config = {
      ...defaultConfig,
      ...config,
    }
    try {
      this.pool = new Pool(this.config);
    } catch (error) {
      console.log(error);
      exit(1);
    }
  }

  public query = async (query: string, params?: string[]) => {
    const start = Date.now();
    const res = await this.pool.query(query, params);
    const duration = Date.now() - start;

    console.log({ query, duration });

    return res;
  }
}

export const db = new Database();
