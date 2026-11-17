const ChatModel = require('../models/chatModel');
const ContextService = require('../services/context.service');
const GeminiService = require('../services/gemini.service');

function currentTimestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

exports.getChatPage = (req, res) => {
  try {
    const initialMessages = ChatModel.getInitialMessages();

    res.render('chat', {
      title: 'AI Assistant - CLASSHUB',
      activePage: 'chat',
      initialMessages,
      aiEnabled: GeminiService.isConfigured()
    });
  } catch (error) {
    console.error('Error rendering chat page:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.sendMessage = async (req, res) => {
  const message = req.body.message;

  try {
    const context = await ContextService.buildContext();

    if (context.isEmpty) {
      return res.json({
        success: true,
        reply: 'Data kelas belum tersedia di database, jadi saya belum bisa menjawab pertanyaan tersebut. Silakan isi data terlebih dahulu melalui admin atau jalankan inisialisasi database.',
        timestamp: currentTimestamp(),
        source: 'database'
      });
    }

    const reply = await GeminiService.generateReply(message, context.text);

    return res.json({
      success: true,
      reply,
      timestamp: currentTimestamp(),
      source: 'gemini+database'
    });
  } catch (error) {
    if (error.name === 'GeminiServiceError') {
      console.error('Gemini service failure:', error.message);
      return res.status(error.statusCode || 502).json({
        success: false,
        error: error.statusCode === 503
          ? 'Layanan AI belum dikonfigurasi oleh administrator.'
          : 'Layanan AI sedang tidak dapat diakses. Silakan coba beberapa saat lagi.'
      });
    }

    console.error('Error handling chat message:', error);
    return res.status(500).json({
      success: false,
      error: 'Gagal mengambil data kelas dari database. Silakan coba lagi.'
    });
  }
};
