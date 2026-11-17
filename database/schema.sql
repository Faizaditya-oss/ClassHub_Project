-- Skema database CLASSHUB
-- Tabel ini menampung data profil kelas, anggota, dan kegiatan.

CREATE TABLE IF NOT EXISTS class_profiles (
  id                SERIAL PRIMARY KEY,
  name              TEXT NOT NULL,
  short_name        VARCHAR(50) NOT NULL,
  tagline           TEXT,
  academic_year     VARCHAR(50),
  semester          VARCHAR(50),
  homeroom_teacher  VARCHAR(150),
  leader            VARCHAR(150),
  vice_leader       VARCHAR(150),
  total_students    INTEGER NOT NULL DEFAULT 0,
  total_activities  INTEGER NOT NULL DEFAULT 0,
  active_projects   INTEGER NOT NULL DEFAULT 0,
  achievements      INTEGER NOT NULL DEFAULT 0,
  description       TEXT,
  vision            TEXT,
  missions          JSONB NOT NULL DEFAULT '[]'::jsonb,
  socials           JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS members (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(150) NOT NULL,
  nim         VARCHAR(30) NOT NULL UNIQUE,
  role        VARCHAR(100) NOT NULL,
  department  VARCHAR(150),
  avatar      TEXT,
  quote       TEXT,
  featured    BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS activities (
  id             SERIAL PRIMARY KEY,
  title          VARCHAR(255) NOT NULL UNIQUE,
  category       VARCHAR(100) NOT NULL,
  activity_date  DATE NOT NULL,
  event_time     VARCHAR(100),
  location       VARCHAR(255),
  description    TEXT,
  image          TEXT,
  status         VARCHAR(30) NOT NULL DEFAULT 'Mendatang'
                 CHECK (status IN ('Selesai', 'Mendatang', 'Berlangsung'))
);
