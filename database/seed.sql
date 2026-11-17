-- Data awal CLASSHUB
-- Aman dijalankan berulang kali (idempotent) berkat klausa ON CONFLICT.

INSERT INTO class_profiles (
  name, short_name, tagline, academic_year, semester,
  homeroom_teacher, leader, vice_leader,
  total_students, total_activities, active_projects, achievements,
  description, vision, missions, socials
)
SELECT
  'Teknik Informatika 2024 - Kelas A',
  'TI-24A',
  'Inovatif, Kolaboratif, dan Berintegritas Menuju Masa Depan Digital',
  '2024 / 2025',
  'Semester 4',
  'Dr. Ir. Hendra Prasetyo, M.T.',
  'Arya Pratama',
  'Nabila Putri',
  36,
  4,
  4,
  8,
  'Kelas Teknik Informatika A Angkatan 2024 adalah komunitas pembelajar yang berdedikasi tinggi dalam mengeksplorasi rekayasa perangkat lunak, kecerdasan buatan, dan teknologi modern. Kami menjunjung tinggi nilai kebersamaan, rasa ingin tahu intelektual, serta semangat berkarya untuk masyarakat.',
  'Menjadi kelas unggulan yang melahirkan talenta digital berdaya saing global, berkarakter luhur, dan adaptif terhadap perkembangan teknologi mutakhir.',
  '[
    "Membangun budaya kolaboratif dan saling mendukung dalam prestasi akademik maupun non-akademik.",
    "Mengembangkan keterampilan praktis melalui proyek teknologi nyata dan riset terapan.",
    "Menumbuhkan etika profesional, tanggung jawab sosial, dan jiwa kepemimpinan.",
    "Menyediakan wadah eksplorasi teknologi AI dan komputasi terkini untuk menjawab tantangan industri."
  ]'::jsonb,
  '{
    "instagram": "@ti24a.official",
    "github": "github.com/ti24a-class",
    "email": "kelas.ti24a@kampus.ac.id"
  }'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM class_profiles);

INSERT INTO members (name, nim, role, department, avatar, quote, featured) VALUES
  ('Arya Pratama', '240101001', 'Ketua Kelas', 'Pengembangan Organisasi',
   'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
   'Memimpin dengan keteladanan dan merangkul kebersamaan.', TRUE),
  ('Nabila Putri', '240101002', 'Wakil Ketua', 'Internal & Koordinasi',
   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
   'Kunci keberhasilan adalah komunikasi dan empati.', TRUE),
  ('Dimas Saputra', '240101003', 'Sekretaris 1', 'Administrasi & Arsip',
   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
   'Rapi dalam dokumentasi, tertib dalam eksekusi.', FALSE),
  ('Siti Rahma', '240101004', 'Sekretaris 2', 'Administrasi & Jadwal',
   'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
   'Detail kecil membuat perubahan besar.', FALSE),
  ('Fajar Nugraha', '240101005', 'Bendahara 1', 'Keuangan & Kas',
   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
   'Transparan, akuntabel, dan bertanggung jawab.', FALSE),
  ('Anisa Larasati', '240101006', 'Bendahara 2', 'Keuangan & Logistik',
   'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
   'Manajemen keuangan yang sehat untuk kemandirian kelas.', FALSE),
  ('Budi Santoso', '240101007', 'Koordinator Akademik', 'Akademik & Tutorial',
   'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
   'Belajar bersama untuk maju bersama tanpa tertinggal.', FALSE),
  ('Rizky Firmansyah', '240101008', 'Koordinator Humas & Media', 'Publikasi & Desain',
   'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
   'Menyampaikan cerita inspiratif kelas ke dunia luar.', FALSE)
ON CONFLICT (nim) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  department = EXCLUDED.department,
  avatar = EXCLUDED.avatar,
  quote = EXCLUDED.quote,
  featured = EXCLUDED.featured;

INSERT INTO activities (
  title, category, activity_date, event_time, location, description, image, status
) VALUES
  ('Workshop Pengenalan Kecerdasan Buatan (AI) & LLM', 'Akademik & Riset',
   '2025-03-14', '09:00 - 15:00 WIB', 'Laboratorium Komputasi Cerdas',
   'Pelatihan intensif eksplorasi generative AI dan integrasi Gemini API untuk pembuatan aplikasi cerdas berbasis web.',
   'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
   'Selesai'),
  ('Study Group: Algoritma dan Struktur Data Tingkat Lanjut', 'Tutorial Kelas',
   '2025-02-28', '13:30 - 16:30 WIB', 'Ruang Diskusi Perpustakaan Lt. 3',
   'Sesi bimbingan intensif persiapan ujian tengah semester, fokus pada implementasi Tree, Graph, dan Dynamic Programming.',
   'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
   'Selesai'),
  ('Class Bonding & Outing: Synergy in Harmony', 'Non-Akademik',
   '2025-01-18', '08:00 - 17:00 WIB', 'Taman Budaya Sentul',
   'Kegiatan kebersamaan untuk mempererat kekeluargaan, mengasah kerjasama tim, dan melepas penat pasca ujian akhir semester.',
   'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
   'Selesai'),
  ('Bakti Sosial Digital: Edukasi Internet Sehat di Sekolah Binaan', 'Pengabdian Masyarakat',
   '2025-04-26', '08:30 - 12:30 WIB', 'SMP Negeri 04 Kota',
   'Sosialisasi keamanan siber, privasi data, dan pemanfaatan media belajar digital yang produktif bagi generasi muda.',
   'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
   'Mendatang')
ON CONFLICT (title) DO UPDATE SET
  category = EXCLUDED.category,
  activity_date = EXCLUDED.activity_date,
  event_time = EXCLUDED.event_time,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  status = EXCLUDED.status;
