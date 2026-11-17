const pool = require('../config/database');

const INDONESIAN_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

function formatDate(value) {
  if (!value) return '';
  const raw = value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value).slice(0, 10);
  const [year, month, day] = raw.split('-').map(Number);

  if (!year || !month || !day) return String(value);

  return `${day} ${INDONESIAN_MONTHS[month - 1]} ${year}`;
}

function mapActivityRow(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    date: formatDate(row.activity_date),
    time: row.event_time,
    location: row.location,
    description: row.description,
    image: row.image,
    status: row.status
  };
}

const ActivityModel = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT id, title, category, activity_date, event_time, location,
              description, image, status
       FROM activities
       ORDER BY activity_date DESC, id DESC`
    );

    return result.rows.map(mapActivityRow);
  },

  getRecent: async (limit = 3) => {
    const safeLimit = Number.isInteger(Number(limit)) && Number(limit) > 0
      ? Number(limit)
      : 3;

    const result = await pool.query(
      `SELECT id, title, category, activity_date, event_time, location,
              description, image, status
       FROM activities
       ORDER BY activity_date DESC, id DESC
       LIMIT $1`,
      [safeLimit]
    );

    return result.rows.map(mapActivityRow);
  },

  getById: async (id) => {
    const result = await pool.query(
      `SELECT id, title, category, activity_date, event_time, location,
              description, image, status
       FROM activities
       WHERE id = $1`,
      [id]
    );

    return result.rows.length > 0 ? mapActivityRow(result.rows[0]) : null;
  },

  getCount: async () => {
    const result = await pool.query('SELECT COUNT(*)::int AS total FROM activities');
    return result.rows[0].total;
  }
};

module.exports = ActivityModel;
