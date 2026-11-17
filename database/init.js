require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const connection = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD
};

async function ensureDatabase() {
  const database = process.env.DB_NAME || 'classhub_db';
  const admin = new Client({ ...connection, database: 'postgres' });

  await admin.connect();
  try {
    const result = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [database]);
    if (result.rowCount === 0) {
      const identifier = `"${database.replace(/"/g, '""')}"`;
      await admin.query(`CREATE DATABASE ${identifier}`);
      console.log(`Database ${database} berhasil dibuat.`);
    } else {
      console.log(`Database ${database} sudah tersedia.`);
    }
  } finally {
    await admin.end();
  }
}

async function runSql(pool, filename) {
  const sql = fs.readFileSync(path.join(__dirname, filename), 'utf8');
  await pool.query(sql);
  console.log(`Berhasil menjalankan ${filename}.`);
}

const REQUIRED_COLUMNS = {
  class_profiles: ['name', 'short_name', 'missions', 'socials'],
  members: ['name', 'nim', 'role', 'department', 'avatar', 'quote', 'featured'],
  activities: ['title', 'category', 'activity_date', 'event_time', 'location', 'description', 'image', 'status']
};

async function prepareLegacySchema(pool) {
  const incompatible = [];
  const legacyTables = [];

  for (const table of Object.keys(REQUIRED_COLUMNS)) {
    const result = await pool.query(
      `SELECT column_name
       FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = $1`,
      [table]
    );

    if (result.rows.length === 0) continue;

    legacyTables.push(table);
    const existing = result.rows.map((row) => row.column_name);
    const missing = REQUIRED_COLUMNS[table].filter((column) => !existing.includes(column));

    if (missing.length > 0) {
      incompatible.push(`${table} (kolom hilang: ${missing.join(', ')})`);
    }
  }

  if (incompatible.length === 0) return;

  for (const table of legacyTables) {
    const count = await pool.query(`SELECT COUNT(*)::int AS total FROM ${table}`);
    if (count.rows[0].total > 0) {
      throw new Error(
        `Skema lama tidak kompatibel dan tabel berisi data: ${incompatible.join('; ')}. ` +
        'Migrasikan data secara manual sebelum menjalankan ulang npm run db:init.'
      );
    }
  }

  console.log('Skema lama yang tidak kompatibel dan kosong akan dibuat ulang.');
  await pool.query('DROP TABLE IF EXISTS activities, members, class_profiles CASCADE');
}

async function main() {
  await ensureDatabase();

  const pool = require('../config/database');
  try {
    await prepareLegacySchema(pool);
    await runSql(pool, 'schema.sql');
    await runSql(pool, 'seed.sql');

    const [profiles, members, activities] = await Promise.all([
      pool.query('SELECT COUNT(*)::int AS total FROM class_profiles'),
      pool.query('SELECT COUNT(*)::int AS total FROM members'),
      pool.query('SELECT COUNT(*)::int AS total FROM activities')
    ]);

    console.log('Inisialisasi selesai:');
    console.log(`- class_profiles : ${profiles.rows[0].total} baris`);
    console.log(`- members        : ${members.rows[0].total} baris`);
    console.log(`- activities     : ${activities.rows[0].total} baris`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error('Inisialisasi database gagal:', error.message);
  process.exit(1);
});
