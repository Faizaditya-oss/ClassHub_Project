const pool = require('../config/database');

function mapMemberRow(row) {
  return {
    id: row.id,
    name: row.name,
    nim: row.nim,
    role: row.role,
    department: row.department,
    avatar: row.avatar,
    quote: row.quote,
    featured: row.featured
  };
}

const MemberModel = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT id, name, nim, role, department, avatar, quote, featured
       FROM members
       ORDER BY featured DESC, id ASC`
    );

    return result.rows.map(mapMemberRow);
  },

  getFeatured: async () => {
    const result = await pool.query(
      `SELECT id, name, nim, role, department, avatar, quote, featured
       FROM members
       WHERE featured = TRUE
       ORDER BY id ASC`
    );

    return result.rows.map(mapMemberRow);
  },

  getById: async (id) => {
    const result = await pool.query(
      `SELECT id, name, nim, role, department, avatar, quote, featured
       FROM members
       WHERE id = $1`,
      [id]
    );

    return result.rows.length > 0 ? mapMemberRow(result.rows[0]) : null;
  },

  getCount: async () => {
    const result = await pool.query('SELECT COUNT(*)::int AS total FROM members');
    return result.rows[0].total;
  }
};

module.exports = MemberModel;
