require('dotenv').config();

// Konfigurasi Google Gemini API (hanya dipakai di sisi server).
const geminiConfig = {
  apiKey: (process.env.GEMINI_API_KEY || '').trim(),
  model: (process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite').trim(),
  fallbackModels: (process.env.GEMINI_FALLBACK_MODELS || 'gemini-3.5-flash-lite,gemini-3.1-flash-lite')
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean),
  isConfigured: () => Boolean((process.env.GEMINI_API_KEY || '').trim())
};

module.exports = geminiConfig;
