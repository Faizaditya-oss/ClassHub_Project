require('dotenv').config();

// Konfigurasi awal Google Gemini API
// Integrasi API aktif dan panggilan model akan diaktifkan pada tahap selanjutnya.
const geminiConfig = {
  apiKey: process.env.GEMINI_API_KEY || '',
  model: 'gemini-1.5-flash',
  isConfigured: () => Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== ''),
};

module.exports = geminiConfig;
