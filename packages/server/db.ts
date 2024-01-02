import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: '111418',
    host: 'localhost',
    port: 5432,
    database: 'ventscapedb',
});

export const databaseQuery = (text: string, params?: any[]) => pool.query(text, params);
