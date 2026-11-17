const express = require('express');
const path = require('path');
require('dotenv').config();

const indexRoutes = require('./routes/indexRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Assets (Public Directory)
app.use(express.static(path.join(__dirname, 'public')));

// Routing Utama (MVC)
app.use('/', indexRoutes);

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Halaman Tidak Ditemukan',
    activePage: ''
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(500).send('Terjadi kesalahan pada server.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` CLASSHUB - Platform Profil & Informasi Kelas (AI)`);
  console.log(` Server berjalan di http://localhost:${PORT}`);
  console.log(` Environment      : ${process.env.NODE_ENV || 'development'}`);
  console.log(` Tahap 1          : Fondasi MVC, Tailwind, & EJS Berhasil`);
  console.log(`====================================================`);
});

module.exports = app;
