const { Pool, types } = require('pg');
require('dotenv').config();

// Kolom DATE dikembalikan sebagai string (YYYY-MM-DD) agar format tanggal
// tidak bergeser karena konversi zona waktu.
types.setTypeParser(1082, (value) => value);

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'classhub_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: Number(process.env.DB_POOL_MAX) || 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('PostgreSQL berhasil terhubung!');
});

pool.on('error', (err) => {
  console.error('Database error:', err.message);
});

module.exports = pool;
