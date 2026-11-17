const pool = require('../config/database');

const INDONESIAN_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

function formatDate(value) {
  if (!value) return '-';
  const raw = value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value).slice(0, 10);
  const [year, month, day] = raw.split('-').map(Number);

  if (!year || !month || !day) return String(value);

  return `${day} ${INDONESIAN_MONTHS[month - 1]} ${year}`;
}

function buildClassSection(profile) {
  if (!profile) {
    return 'PROFIL KELAS: Tidak ada data pada tabel class_profiles.';
  }

  const missions = Array.isArray(profile.missions) ? profile.missions : [];
  const socials = profile.socials && typeof profile.socials === 'object'
    ? profile.socials
    : {};

  return [
    'PROFIL KELAS:',
    `- Nama kelas: ${profile.name}`,
    `- Kode/Nama singkat: ${profile.short_name}`,
    `- Tagline: ${profile.tagline || '-'}`,
    `- Tahun akademik: ${profile.academic_year || '-'}`,
    `- Semester: ${profile.semester || '-'}`,
    `- Dosen pembina/wali: ${profile.homeroom_teacher || '-'}`,
    `- Ketua kelas: ${profile.leader || '-'}`,
    `- Wakil ketua kelas: ${profile.vice_leader || '-'}`,
    `- Total mahasiswa: ${profile.total_students ?? 0}`,
    `- Total kegiatan (kolom class_profiles): ${profile.total_activities ?? 0}`,
    `- Proyek aktif: ${profile.active_projects ?? 0}`,
    `- Penghargaan/prestasi: ${profile.achievements ?? 0}`,
    `- Deskripsi: ${profile.description || '-'}`,
    `- Visi: ${profile.vision || '-'}`,
    `- Misi: ${missions.length > 0 ? missions.map((m, i) => `${i + 1}. ${m}`).join(' ') : '-'}`,
    `- Instagram: ${socials.instagram || '-'}`,
    `- GitHub: ${socials.github || '-'}`,
    `- Email: ${socials.email || '-'}`
  ].join('\n');
}

function buildMemberSection(members) {
  if (members.length === 0) {
    return 'ANGGOTA: Tidak ada data pada tabel members.';
  }

  const rows = members.map((member, index) => {
    return `${index + 1}. ${member.name} | NIM: ${member.nim} | Peran: ${member.role} | Bidang: ${member.department || '-'} | Kutipan: ${member.quote || '-'} | Ditampilkan sebagai inti: ${member.featured ? 'ya' : 'tidak'}`;
  });

  return [
    `ANGGOTA (${members.length} baris pada tabel members):`,
    ...rows,
    'Catatan: kolom total_students pada class_profiles adalah jumlah total mahasiswa kelas, sedangkan daftar ini adalah anggota yang tercatat pada tabel members.'
  ].join('\n');
}

function buildActivitySection(activities) {
  if (activities.length === 0) {
    return 'KEGIATAN: Tidak ada data pada tabel activities.';
  }

  const rows = activities.map((activity, index) => {
    return `${index + 1}. ${activity.title} | Kategori: ${activity.category} | Tanggal: ${formatDate(activity.activity_date)} | Waktu: ${activity.event_time || '-'} | Lokasi: ${activity.location || '-'} | Status: ${activity.status} | Deskripsi: ${activity.description || '-'}`;
  });

  return [
    `KEGIATAN (${activities.length} baris pada tabel activities):`,
    ...rows
  ].join('\n');
}

const ContextService = {
  buildContext: async () => {
    const [classResult, memberResult, activityResult] = await Promise.all([
      pool.query('SELECT * FROM class_profiles ORDER BY id ASC LIMIT 1'),
      pool.query(
        `SELECT id, name, nim, role, department, avatar, quote, featured
         FROM members
         ORDER BY featured DESC, id ASC`
      ),
      pool.query(
        `SELECT id, title, category, activity_date, event_time, location,
                description, image, status
         FROM activities
         ORDER BY activity_date DESC, id DESC`
      )
    ]);

    const classProfile = classResult.rows[0] || null;
    const members = memberResult.rows;
    const activities = activityResult.rows;

    const text = [
      '=== DATA KONTEKS UCP-PAW / CLASSHUB ===',
      buildClassSection(classProfile),
      '',
      buildMemberSection(members),
      '',
      buildActivitySection(activities),
      '=== AKHIR DATA KONTEKS ==='
    ].join('\n');

    return {
      classProfile,
      members,
      activities,
      text,
      isEmpty: !classProfile && members.length === 0 && activities.length === 0
    };
  }
};

module.exports = ContextService;
