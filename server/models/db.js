import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// const { TESTDB_URL, DATABASE_URL } = process.env;
let pool;
if (process.env.NODE_ENV === 'test') {
  pool = new Pool({ connectionString: process.env.TESTDB_URL });
} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;
