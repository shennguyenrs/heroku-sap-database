import { Client } from 'pg';

import { DATABASE_URL } from './config';

const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export = client;
