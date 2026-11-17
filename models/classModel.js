const pool = require('../config/database');

function parseJson(value, fallback) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object') return value;

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

function mapClassRow(row) {
  return {
    id: row.id,
    name: row.name,
    shortName: row.short_name,
    tagline: row.tagline,
    academicYear: row.academic_year,
    semester: row.semester,
    homeroomTeacher: row.homeroom_teacher,
    leader: row.leader,
    viceLeader: row.vice_leader,
    totalStudents: row.total_students,
    totalActivities: row.total_activities,
    activeProjects: row.active_projects,
    achievements: row.achievements,
    description: row.description,
    vision: row.vision,
    missions: parseJson(row.missions, []),
    socials: parseJson(row.socials, {})
  };
}

const ClassModel = {
  getInfo: async () => {
    const result = await pool.query(
      'SELECT * FROM class_profiles ORDER BY id ASC LIMIT 1'
    );

    return result.rows.length > 0 ? mapClassRow(result.rows[0]) : null;
  },

  getStatistics: async (classInfo = null) => {
    const info = classInfo || (await ClassModel.getInfo());

    return {
      totalStudents: info ? info.totalStudents : 0,
      totalActivities: info ? info.totalActivities : 0,
      activeProjects: info ? info.activeProjects : 0,
      achievements: info ? info.achievements : 0
    };
  }
};

module.exports = ClassModel;
